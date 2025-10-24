import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, ChatMode, Message, Chat } from '../types';
import { startGuestChatSession, sendMessageToBot } from '../services/geminiService';
import { getChatById, sendMessage, getGuestHistory, saveGuestHistory } from '../services/chatService';
import MessageBubble from './MessageBubble';

interface ChatScreenProps {
  user: User;
  chat: Chat | null;
  chatMode: ChatMode;
  onBack: () => void;
}

const botUser: User = { id: 'bot', name: 'Jalpa', avatar: 'https://i.pravatar.cc/150?u=jalpa-ai' };

const ChatScreen: React.FC<ChatScreenProps> = ({ user, chat, chatMode, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(chat);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(() => {
    if (chatMode === ChatMode.GUEST) {
      setMessages(getGuestHistory());
    } else if (chat?.id) {
      const chatData = getChatById(chat.id);
      setCurrentChat(chatData);
      setMessages(chatData?.messages || []);
    }
  }, [chat, chatMode]);

  useEffect(() => {
    loadMessages();
    
    const handleMessagesUpdate = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail.chatId === chat?.id) {
            loadMessages();
        }
    };

    window.addEventListener('messagesUpdated', handleMessagesUpdate);
    return () => {
        window.removeEventListener('messagesUpdated', handleMessagesUpdate);
    };
  }, [chat?.id, loadMessages]);


  const getChatPartner = () => {
    if (chatMode !== ChatMode.PERSONAL || !currentChat) return null;
    return currentChat.participants.find(p => !p.isMe);
  };

  const getChatTitle = () => {
    if (chatMode === ChatMode.GUEST) return 'Guest Chat';
    if (chatMode === ChatMode.ACCOUNT) return currentChat?.name;
    return getChatPartner()?.name || 'Chat';
  };

  const getChatAvatar = () => {
    if (chatMode === ChatMode.GUEST) return botUser.avatar;
    if (chatMode === ChatMode.ACCOUNT) return 'https://i.pravatar.cc/150?u=group-chat';
    return getChatPartner()?.avatar;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatMode === ChatMode.GUEST) {
      startGuestChatSession();
      if(messages.length === 0){
        setIsLoading(true);
        sendMessageToBot(`Hello, I'm a guest.`).then(botResponse => {
            const botMessage: Message = {
                id: `msg-${Date.now()}`,
                text: botResponse,
                sender: botUser,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([botMessage]);
            saveGuestHistory([botMessage]);
            setIsLoading(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMode]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const text = inputValue;
    setInputValue('');
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: text,
      sender: user,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    setIsLoading(true);

    if (chatMode === ChatMode.GUEST) {
      saveGuestHistory(updatedMessages);
      const botResponse = await sendMessageToBot(text);
      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        text: botResponse,
        sender: botUser,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => {
        const finalMessages = [...prev, botMessage];
        saveGuestHistory(finalMessages);
        return finalMessages;
      });
    } else if (currentChat?.id) {
      sendMessage(currentChat.id, text, user.id);
      loadMessages(); // immediate update for sent message
    }
    
    setIsLoading(false);
  }, [inputValue, isLoading, user, chatMode, messages, currentChat, loadMessages]);

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white">
      <header className="flex items-center p-3 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img src={getChatAvatar()} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 className="font-bold text-lg">{getChatTitle()}</h2>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} currentUser={user} />
        ))}
        {isLoading && chatMode === ChatMode.GUEST && (
          <div className="flex items-center space-x-2">
              <img src={botUser.avatar} alt="bot avatar" className="w-8 h-8 rounded-full" />
              <div className="bg-gray-700 p-3 rounded-lg flex items-center space-x-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-3 bg-gray-900/80 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          <button type="submit" className="bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600 disabled:bg-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatScreen;

import React, { useState, useEffect } from 'react';
import { User, Chat, ChatType } from '../types';
import { getChatList } from '../services/chatService';

interface HomeScreenProps {
  user: User;
  onSelectChat: (chat: Chat) => void;
  onLogout: () => void;
  onNavigateToSettings: () => void;
}

const ChatListItem: React.FC<{ chat: Chat; onClick: () => void }> = ({ chat, onClick }) => {
  const partner = chat.type === ChatType.PERSONAL ? chat.participants.find(p => !p.isMe) : null;
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors duration-200"
    >
      <img
        src={partner?.avatar || `https://i.pravatar.cc/150?u=${chat.id}`}
        alt={partner?.name || chat.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-bold truncate">{partner?.name || chat.name}</h3>
          <p className="text-xs text-gray-400">{lastMessage?.timestamp}</p>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-400 truncate pr-2">{lastMessage?.text || 'No messages yet'}</p>
          {chat.unreadCount && chat.unreadCount > 0 && (
             <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
               {chat.unreadCount}
             </span>
          )}
        </div>
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onSelectChat, onLogout, onNavigateToSettings }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats(getChatList());
  }, []);

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white">
      <header className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <h1 className="text-xl font-bold">Jalpa</h1>
        <div className="flex items-center gap-2">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            <button onClick={onNavigateToSettings} className="p-1 rounded-full hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
            </button>
            <button onClick={onLogout} className="p-1 rounded-full hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-2">
        {chats.map(chat => (
          <ChatListItem key={chat.id} chat={chat} onClick={() => onSelectChat(chat)} />
        ))}
      </main>
    </div>
  );
};

export default HomeScreen;

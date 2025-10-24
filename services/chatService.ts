import { Chat, Message, User } from '../types';
import { MOCK_CHATS, MOCK_USERS } from '../data/mock';
import { getStorageItem, setStorageItem } from './storageService';

const CHATS_STORAGE_KEY = 'jalpa-chats';
const GUEST_HISTORY_KEY = 'jalpa-guest-history';


const initializeChats = (): Chat[] => {
  let chats = getStorageItem<Chat[]>(CHATS_STORAGE_KEY);
  if (!chats) {
    chats = MOCK_CHATS;
    setStorageItem(CHATS_STORAGE_KEY, chats);
  }
  return chats;
};

// Initialize on load
initializeChats();

export const getChatList = (): Chat[] => {
  return getStorageItem<Chat[]>(CHATS_STORAGE_KEY) || [];
};

export const getChatById = (chatId: string): Chat | undefined => {
  const chats = getChatList();
  return chats.find(chat => chat.id === chatId);
};

const saveChats = (chats: Chat[]) => {
  setStorageItem(CHATS_STORAGE_KEY, chats);
};

export const sendMessage = (chatId: string, text: string, senderId: string) => {
  const chats = getChatList();
  const chatIndex = chats.findIndex(c => c.id === chatId);

  if (chatIndex === -1) return;

  const sender = MOCK_USERS.find(u => u.id === senderId);
  if (!sender) return;

  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    text,
    sender,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  chats[chatIndex].messages.push(newMessage);
  chats[chatIndex].unreadCount = 0; // Clear unread on sending a message
  saveChats(chats);

  // Simulate a reply
  simulateReply(chatId, senderId);
};

const simulateReply = (chatId: string, originalSenderId: string) => {
    setTimeout(() => {
        const chats = getChatList();
        const chatIndex = chats.findIndex(c => c.id === chatId);
        if (chatIndex === -1) return;

        const chat = chats[chatIndex];
        const replier = chat.participants.find(p => p.id !== originalSenderId);

        if (replier) {
             const replyMessage: Message = {
                id: `msg-reply-${Date.now()}`,
                text: `Sounds good!`,
                sender: replier,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            chats[chatIndex].messages.push(replyMessage);
            chats[chatIndex].unreadCount = (chats[chatIndex].unreadCount || 0) + 1;
            saveChats(chats);

            // Notify UI of update
            window.dispatchEvent(new CustomEvent('messagesUpdated', { detail: { chatId } }));
        }
    }, 1500 + Math.random() * 1000); // random delay
}

// Guest History Management
export const getGuestHistory = (): Message[] => {
    return getStorageItem<Message[]>(GUEST_HISTORY_KEY) || [];
}

export const saveGuestHistory = (messages: Message[]) => {
    setStorageItem(GUEST_HISTORY_KEY, messages);
}

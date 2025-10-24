export enum ChatMode {
  GUEST = 'Guest',
  ACCOUNT = 'Account',
  PERSONAL = 'Personal',
}

export enum ChatType {
  PERSONAL = 'PERSONAL',
  GROUP = 'GROUP',
}

export type LoginMethod = 'google' | 'whatsapp' | 'mobile' | null;

export interface User {
  id: string;
  name: string;
  avatar: string;
  isMe?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: string;
}

export interface Chat {
  id: string;
  type: ChatType;
  name?: string; // For group chats
  participants: User[];
  messages: Message[];
  unreadCount?: number;
}

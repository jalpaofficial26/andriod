import { User, Chat, ChatType } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-me', name: 'You', avatar: 'https://i.pravatar.cc/150?u=user-me', isMe: true },
  { id: 'user-emily', name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=emily' },
  { id: 'user-liam', name: 'Liam', avatar: 'https://i.pravatar.cc/150?u=liam' },
  { id: 'user-sophia', name: 'Sophia', avatar: 'https://i.pravatar.cc/150?u=sophia' },
  { id: 'user-noah', name: 'Noah', avatar: 'https://i.pravatar.cc/150?u=noah' },
];

const [me, emily, liam, sophia, noah] = MOCK_USERS;

export const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    type: ChatType.PERSONAL,
    participants: [me, emily],
    messages: [
      {
        id: 'msg-1-1',
        text: 'Hey! Are we still on for lunch tomorrow?',
        sender: emily,
        timestamp: '11:30 AM',
      },
      {
        id: 'msg-1-2',
        text: 'Yes, absolutely! The usual spot?',
        sender: me,
        timestamp: '11:31 AM',
      },
    ],
    unreadCount: 1,
  },
  {
    id: 'chat-2',
    type: ChatType.GROUP,
    name: 'Weekend Plans 🚀',
    participants: [me, emily, liam],
    messages: [
      {
        id: 'msg-2-1',
        text: 'Anyone up for a hike this weekend?',
        sender: liam,
        timestamp: 'Yesterday',
      },
    ],
    unreadCount: 3,
  },
  {
    id: 'chat-3',
    type: ChatType.PERSONAL,
    participants: [me, sophia],
    messages: [
       {
        id: 'msg-3-1',
        text: 'I saw that movie you recommended, it was amazing!',
        sender: sophia,
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'chat-4',
    type: ChatType.GROUP,
    name: 'Family',
    participants: [me, noah, sophia],
    messages: [
        {
            id: 'msg-4-1',
            text: "Don't forget about Mom's birthday on Friday!",
            sender: noah,
            timestamp: 'Mon'
        }
    ]
  }
];

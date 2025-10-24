import React from 'react';
import { Message, User } from '../types';

interface MessageBubbleProps {
  message: Message;
  currentUser: User;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUser }) => {
  const isCurrentUser = message.sender.id === currentUser.id;

  const bubbleClasses = isCurrentUser
    ? 'bg-blue-600 text-white self-end rounded-br-none'
    : 'bg-gray-700 text-gray-200 self-start rounded-bl-none';

  const containerClasses = isCurrentUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-end gap-2 ${containerClasses}`}>
      {!isCurrentUser && (
        <img src={message.sender.avatar} alt={message.sender.name} className="w-8 h-8 rounded-full" />
      )}
      <div className="flex flex-col" style={{ maxWidth: '75%' }}>
        {!isCurrentUser && (
          <span className="text-xs text-gray-400 ml-2 mb-1">{message.sender.name}</span>
        )}
        <div className={`p-3 rounded-2xl ${bubbleClasses}`}>
          <p className="text-sm">{message.text}</p>
        </div>
        <span className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'self-end' : 'self-start'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;

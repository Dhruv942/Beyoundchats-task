import React from 'react';
import { Chat } from '../dummy';

interface ChatPanelProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 pl-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          
          return (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200 ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="flex items-center">
                <img
                  src={chat.avatar}
                  alt={`${chat.name}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lastMessage ? lastMessage.text : ''}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to format timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default ChatPanel;
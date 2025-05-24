import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../dummy';
import { formatTimestamp } from '../utils';

interface MiddleChatProps {
  selectedChat: Chat | null;
  onSendMessage: (text: string) => void;
  onSelectText: (text: string, position: { x: number; y: number }) => void;
}

const MiddleChat: React.FC<MiddleChatProps> = ({ 
  selectedChat, 
  onSendMessage, 
  onSelectText 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      onSelectText(
        selection.toString(), 
        { 
          x: rect.left + rect.width / 2, 
          y: rect.top - 10 
        }
      );
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500 text-center">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 bg-white flex items-center">
        <img
          src={selectedChat.avatar}
          alt={`${selectedChat.name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="text-md font-semibold text-gray-800">{selectedChat.name}</h2>
          <p className="text-xs text-gray-500">Last seen: {selectedChat.lastSeen}</p>
        </div>
      </div>

      {/* Messages container */}
      <div 
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
        ref={chatContainerRef}
        onMouseUp={handleTextSelection}
      >
        {selectedChat.messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`ml-3 p-2.5 rounded-full focus:outline-none ${
              newMessage.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Message bubble component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[75%] p-3 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MiddleChat;
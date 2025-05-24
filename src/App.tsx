import  { useState, useEffect } from 'react';
import ChatPanel from './components/ChatPanel';
import MiddleChat from './components/MiddleChat';
import AIResponsePanel from './components/AIResponse';
import FloatingPrompt from './components/FloatingPrompt';
import { chats, Chat, Message } from './dummy';
import { AIResponse } from './types';

function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptPosition, setPromptPosition] = useState({ x: 0, y: 0 });
  const [aiResponses, setAIResponses] = useState<AIResponse[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'conversation' | 'ai'>('chat');

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set first chat as selected by default
  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      handleSelectChat(chats[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setAIResponses([]); // Clear AI responses when changing chats
    setActivePanel('conversation'); // Switch to conversation panel on mobile
  };

  const handleSendMessage = (text: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Update the selected chat with the new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
    };

    // Update the chat in the chats array
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // Update the selected chat
    setSelectedChat(updatedChat);
  };

  const handleTextSelection = (text: string, position: { x: number; y: number }) => {
    setSelectedText(text);
    setPromptPosition(position);
    setShowPrompt(true);
  };

  const handleSendToAI = (prompt: string) => {
    // Add a loading response
    const loadingResponse: AIResponse = {
      id: `loading-${Date.now()}`,
      text: 'Generating response...',
      loading: true,
    };
    setAIResponses((prev) => [...prev, loadingResponse]);
    setActivePanel('ai'); // Switch to AI panel on mobile

    // Simulate fetching response
    setTimeout(() => {
      const newResponse: AIResponse = {
        id: `ai-${Date.now()}`,
        text: `Here's a response to: "${prompt.substring(0, 30)}..." that provides helpful, contextual advice for this customer interaction.`,
      };

      // Remove loading response and add real response
      setAIResponses((prev) => 
        prev.filter(r => r.id !== loadingResponse.id).concat(newResponse)
      );
    }, 1500);
  };

const handleReplaceAiResponse = (id: string, newResponse: AIResponse) => {
  setAIResponses(prev =>
    prev.map(resp => (resp.id === id ? newResponse : resp))
  );
};

  const handleInsertToInput = (text: string) => {
    // In a real app, you would update the input in the MiddleChat component
    // For this demo, we'll just send the message directly
    handleSendMessage(text);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile navigation */}
      {isMobileView && (
        <div className="bg-white border-b border-gray-200 p-2">
          <div className="flex justify-between">
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activePanel === 'chat'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActivePanel('chat')}
            >
              Chats
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activePanel === 'conversation'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActivePanel('conversation')}
            >
              Conversation
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activePanel === 'ai'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActivePanel('ai')}
            >
              AI
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel (Left) */}
        <div
          className={`${
            isMobileView
              ? activePanel === 'chat'
                ? 'flex-1'
                : 'hidden'
              : 'w-1/4'
          } flex flex-col`}
        >
          <ChatPanel
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Middle Chat */}
        <div
          className={`${
            isMobileView
              ? activePanel === 'conversation'
                ? 'flex-1'
                : 'hidden'
              : 'w-2/4'
          } flex flex-col`}
        >
          <MiddleChat
            selectedChat={selectedChat}
            onSendMessage={handleSendMessage}
            onSelectText={handleTextSelection}
          />
        </div>

        {/* AI Response (Right) */}
        <div
          className={`${
            isMobileView
              ? activePanel === 'ai'
                ? 'flex-1'
                : 'hidden'
              : 'w-1/4'
          } flex flex-col`}
        >
          <AIResponsePanel
            selectedChat={selectedChat}
            selectedText={selectedText}
            aiResponses={aiResponses}
            onReplaceAiResponse={handleReplaceAiResponse}
            onInsertToInput={handleInsertToInput}
            onSendDirectly={handleSendMessage}
            onAddAiResponse={(response: AIResponse) => setAIResponses(prev => [...prev, response])}
          />
        </div>
      </div>

      {/* Floating Prompt */}
      {showPrompt && (
        <FloatingPrompt
          text={selectedText}
          position={promptPosition}
          onClose={() => setShowPrompt(false)}
          onSendToAI={handleSendToAI}
        />
      )}
    </div>
  );
}

export default App;
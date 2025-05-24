import React, { useState, useRef, useEffect } from 'react';

interface FloatingPromptProps {
  text: string;
  position: { x: number; y: number };
  onClose: () => void;
  onSendToAI: (prompt: string) => void;
}

const FloatingPrompt: React.FC<FloatingPromptProps> = ({
  text,
  position,
  onClose,
  onSendToAI,
}) => {
  const [prompt, setPrompt] = useState(`Help me respond to: "${text}"`);
  const promptRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (promptRef.current && !promptRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Position the floating prompt
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: 'translate(-50%, -100%)',
  };

  return (
    <div
      ref={promptRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-72 p-3 animate-fade-in"
      style={style}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Send to AI</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
        autoFocus
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            if (prompt.trim()) {
              onSendToAI(prompt);
              onClose();
            }
          }}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
      
      {/* Arrow pointing to selected text */}
      <div 
        className="absolute w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"
        style={{ 
          bottom: '-6px', 
          left: '50%', 
          marginLeft: '-6px' 
        }}
      />
    </div>
  );
};

export default FloatingPrompt;
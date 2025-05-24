import React, { useState, useEffect } from 'react';
import { Chat } from '../dummy';
import { AIResponse } from '../types';
import { fetchGeminiResponse } from '../utils';

interface AIResponsePanelProps {
  selectedChat: Chat | null;
  selectedText: string;
  aiResponses: AIResponse[];
  onAddAiResponse: (response: AIResponse) => void;
  onReplaceAiResponse: (id: string, newResponse: AIResponse) => void; // To replace loading with real response
  onInsertToInput: (text: string) => void;
  onSendDirectly: (text: string) => void;
}

const AIResponsePanel: React.FC<AIResponsePanelProps> = ({
  selectedChat,
  selectedText,
  aiResponses,
  onAddAiResponse,
  onReplaceAiResponse,
  onInsertToInput,
  onSendDirectly,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      handleGenerateSuggestions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    if (selectedText) {
      setPrompt(`Help me respond to: "${selectedText}"`);
    }
  }, [selectedText]);

  const handleGenerateSuggestions = async () => {
    if (!selectedChat || isGenerating) return;

    setIsGenerating(true);

    try {
      // Last customer message
      const lastCustomerMessage = [...selectedChat.messages]
        .reverse()
        .find(msg => msg.sender === 'customer');

      if (lastCustomerMessage) {
        const defaultPrompt = `Suggest a response to this customer message: "${lastCustomerMessage.text}"`;

        // Add loading placeholder
        const loadingId = `loading-${Date.now()}`;
        const loadingResponse: AIResponse = {
          id: loadingId,
          text: 'Generating response...',
          loading: true,
        };
        onAddAiResponse(loadingResponse);

        const responseText = await fetchGeminiResponse(defaultPrompt);

        if (responseText) {
          onReplaceAiResponse(loadingId, {
            id: `ai-${Date.now()}`,
            text: responseText,
            loading: false,
          });
        } else {
          // Remove loading if no response
          onReplaceAiResponse(loadingId, {
            id: loadingId,
            text: 'Failed to generate response.',
            loading: false,
          });
        }
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim() || isGenerating) return;

    const currentPrompt = prompt;
    setPrompt(''); // reset immediately

    // Add loading placeholder
    const loadingId = `loading-${Date.now()}`;
    const loadingResponse: AIResponse = {
      id: loadingId,
      text: 'Generating response...',
      loading: true,
    };
    onAddAiResponse(loadingResponse);

    setIsGenerating(true);

    try {
      const responseText = await fetchGeminiResponse(currentPrompt);

      if (responseText) {
        onReplaceAiResponse(loadingId, {
          id: `ai-${Date.now()}`,
          text: responseText,
          loading: false,
        });
      } else {
        onReplaceAiResponse(loadingId, {
          id: loadingId,
          text: 'Failed to generate response.',
          loading: false,
        });
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
      onReplaceAiResponse(loadingId, {
        id: loadingId,
        text: 'Error generating response.',
        loading: false,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500 text-center">
          Select a conversation to see AI suggestions
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-l border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">AI Copilot</h2>
        <p className="text-xs text-gray-500 mt-1">
          Get AI-powered suggestions to help with customer support
        </p>
      </div>

      {/* AI responses */}
      <div className="flex-1 overflow-y-auto p-4">
        {aiResponses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">
              AI suggestions will appear here
            </p>
            <button
              onClick={handleGenerateSuggestions}
              disabled={isGenerating}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Suggestions'}
            </button>
          </div>
        ) : (
          aiResponses.map((response) => (
            <div
              key={response.id}
              className={`mb-4 p-4 rounded-lg border border-gray-200 ${
                response.loading ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {response.loading ? (
                <div className="flex items-center">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-500">
                    {response.text}
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-800">{response.text}</p>

                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => handleCopyToClipboard(response.text)}
                      className="text-xs py-1 px-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => onInsertToInput(response.text)}
                      className="text-xs py-1 px-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      Insert
                    </button>
                    <button
                      onClick={() => onSendDirectly(response.text)}
                      className="text-xs py-1 px-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Prompt input */}
      <div className="p-4 border-t border-gray-200">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI for help..."
          className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <button
          onClick={handleSendPrompt}
          disabled={!prompt.trim() || isGenerating}
          className={`mt-2 w-full py-2 rounded-md transition-colors ${
            !prompt.trim() || isGenerating
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Generate Response'}
        </button>
      </div>
    </div>
  );
};

export default AIResponsePanel;

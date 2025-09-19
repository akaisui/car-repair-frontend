'use client';

import React, { useState } from 'react';
import ChatBot from './ChatBot';

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 z-40 flex items-center justify-center"
        title="Chat với AI"
      >
        <span className="text-2xl">🤖</span>
      </button>

      {/* Chat Badge - Pulse animation */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 w-14 h-14 pointer-events-none z-30">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-75"></div>
        </div>
      )}

      {/* ChatBot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
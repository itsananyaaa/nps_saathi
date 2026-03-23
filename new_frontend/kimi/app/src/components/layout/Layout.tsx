import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleVoiceClick = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would trigger the voice pipeline
    if (!isVoiceActive) {
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onVoiceClick={handleVoiceClick}
        isVoiceActive={isVoiceActive}
        userName="Rahul Sharma"
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 pt-16
          lg:ml-${sidebarOpen ? '64' : '20'}
        `}
        style={{
          marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? (sidebarOpen ? '16rem' : '5rem')
            : 0
        }}
      >
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Voice Overlay */}
      {isVoiceActive && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Listening...</h3>
            <p className="text-gray-500">Speak your pension-related question</p>
            <button
              onClick={() => setIsVoiceActive(false)}
              className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

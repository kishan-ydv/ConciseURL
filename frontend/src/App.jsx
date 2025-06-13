import { useState } from 'react';
import UrlShortener from './components/UrlShortener';
import UrlList from './components/UrlList';

function App() {
  const [refreshUrls, setRefreshUrls] = useState(0);

  const handleUrlShortened = () => {
    setRefreshUrls(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConciseURL
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into clean, shareable links with advanced analytics and tracking
          </p>
        </header>
        
        <main className="space-y-8">
          <UrlShortener onUrlShortened={handleUrlShortened} />
          <UrlList refresh={refreshUrls} />
        </main>
        
        <footer className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            Made with ❤️ using React, Node.js, and MongoDB
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
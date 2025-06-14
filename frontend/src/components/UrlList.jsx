import { useState, useEffect } from 'react';

function UrlList({ refresh }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/urls');
      
      if (response.ok) {
        const data = await response.json();
        setUrls(data);
        setError('');
      } else {
        setError('Failed to fetch URLs');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [refresh]); 

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url, maxLength = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchUrls}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-8 border-b border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Shortened URLs</h2>
          <p className="text-gray-600">Manage and track your shortened links</p>
        </div>
      </div>
      
      <div className="p-8">
        {urls.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No URLs yet</h3>
            <p className="text-gray-500">Start by shortening your first URL above!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {urls.map((urlData, index) => (
              <div key={urlData._id} className="group border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-blue-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-500 mb-1">Original URL</p>
                          <a 
                            href={urlData.originalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title={urlData.originalUrl}
                            className="text-gray-800 hover:text-blue-600 transition-colors duration-200 break-all group-hover:text-blue-700"
                          >
                            {truncateUrl(urlData.originalUrl, 60)}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Short URL</p>
                          <a 
                            href={urlData.shortUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 break-all"
                          >
                            {urlData.shortUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-2xl font-bold text-green-600">{urlData.clicks || 0}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Clicks</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6V7m0 4v8m-8-6h16" />
                          </svg>
                          <span className="text-sm text-gray-600 font-medium">{formatDate(urlData.createdAt)}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Created</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlList;
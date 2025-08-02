'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [style, setStyle] = useState('organic');
  const [language, setLanguage] = useState('auto');
  const [location, setLocation] = useState('global');
  const [copyFeedback, setCopyFeedback] = useState('');

  const generateHashtags = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://hyperhash-production-2512.up.railway.app/api/generate-hashtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: inputText.split(' ').slice(0, 5).join(' '),
          description: inputText,
          keywords: inputText.split(' ').filter(word => word.length > 3).slice(0, 10),
          style: style,
          platform: platform,
          language: language,
          location: location,
          limit: 20
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setHashtags(data.hashtags || []);
    } catch (err) {
      setError('Error generating hashtags');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback('Copied!');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const copyAllHashtags = () => {
    const allHashtags = hashtags.join(' ');
    navigator.clipboard.writeText(allHashtags);
    setCopyFeedback('All hashtags copied!');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300">
          {copyFeedback}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hyper<span className="text-blue-600">Hash</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered hashtag generator. Enter your content, get viral hashtags tailored to your language and location.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="text-input" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Enter your content to generate hashtags:
              </label>
              <textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Example: Just opened our new coffee shop! Come try our special blend coffees..."
                className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
              />
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform:
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="youtube">YouTube</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style:
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
                >
                  <option value="organic">Organic</option>
                  <option value="trending">Trending</option>
                  <option value="branded">Branded</option>
                </select>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
                >
                  <option value="auto">Auto-detect</option>
                  <option value="en">English</option>
                  <option value="tr">Turkish</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ar">Arabic</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>

              {/* Location Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location:
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
                >
                  <option value="global">Global</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="tr">Turkey</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="es">Spain</option>
                  <option value="it">Italy</option>
                  <option value="br">Brazil</option>
                  <option value="mx">Mexico</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="jp">Japan</option>
                  <option value="kr">South Korea</option>
                  <option value="in">India</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="ae">UAE</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center mb-8">
              <button
                onClick={generateHashtags}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Hashtags...
                  </span>
                ) : (
                  'Generate Hashtags'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            {/* Results Section */}
            {hashtags.length > 0 && (
              <div className="border-t-2 border-gray-100 dark:border-gray-700 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Generated Hashtags ({hashtags.length})
                  </h2>
                  <button
                    onClick={copyAllHashtags}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Copy All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hashtags.map((hashtag, index) => (
                    <div
                      key={index}
                      onClick={() => copyToClipboard(hashtag)}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900 dark:hover:to-blue-800 p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 group shadow-sm hover:shadow-md"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {hashtag}
                      </span>
                      <div className="flex items-center mt-2">
                        <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                          Copy
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>© 2025 HyperHash - AI Powered Hashtag Generator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

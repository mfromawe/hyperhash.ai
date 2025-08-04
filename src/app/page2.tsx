'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateHashtags = async () => {
    if (!inputText.trim()) {
      setError('Lütfen bir metin girin');
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
          title: inputText.split(' ').slice(0, 5).join(' '), // İlk 5 kelime title olarak
          description: inputText,
          keywords: inputText.split(' ').filter(word => word.length > 3).slice(0, 10), // 3 karakterden uzun kelimeler
          style: 'organic',
          platform: 'instagram',
          language: 'tr',
          limit: 20
        }),
      });

      if (!response.ok) {
        throw new Error('API isteği başarısız oldu');
      }

      const data = await response.json();
      setHashtags(data.hashtags || []);
    } catch (err) {
      setError('Hashtag üretilirken bir hata oluştu');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllHashtags = () => {
    const allHashtags = hashtags.join(' ');
    navigator.clipboard.writeText(allHashtags);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hyper<span className="text-blue-600">Hash</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI ile güçlendirilmiş hashtag generator. Metninizi girin, viral hashtag'ler alın.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="text-input" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Hashtag üretmek istediğiniz metni girin:
              </label>
              <textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Örnek: Yeni kahve dükkanımızı açtık! Özel blend kahvelerimizi denemeye gelin..."
                className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-900 dark:text-white dark:bg-gray-700 transition-colors"
              />
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
                    Hashtag'ler Üretiliyor...
                  </span>
                ) : (
                  'Hashtag Üret'
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
                    Üretilen Hashtag'ler ({hashtags.length})
                  </h2>
                  <button
                    onClick={copyAllHashtags}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Tümünü Kopyala
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hashtags.map((hashtag, index) => (
                    <div
                      key={index}
                      onClick={() => copyToClipboard(hashtag)}
                      className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-3 rounded-lg cursor-pointer transition-colors group"
                    >
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {hashtag}
                      </span>
                      <span className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        Kopyala
                      </span>
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


import React, { useState, useCallback } from 'react';
import { Hashtag, GenerationParams } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import { generateHashtags } from './services/geminiService';

const App: React.FC = () => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (params: GenerationParams) => {
    setIsLoading(true);
    setError(null);
    setHashtags([]);
    try {
      const result = await generateHashtags(params);
      setHashtags(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans p-4">
      <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}
      </style>
      <Header />
      <main className="container mx-auto max-w-4xl w-full flex-grow flex flex-col items-center py-8">
  <div className="w-full bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-indigo-900/20 space-y-8">
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          
            {isLoading && <Loader />}

            {error && (
                <div className="text-center p-4 bg-rose-900/50 border border-rose-700 text-rose-300 rounded-lg animate-fade-in">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p className="text-sm">{error}</p>
                </div>
            )}

            {!isLoading && hashtags.length > 0 && <ResultsDisplay hashtags={hashtags} />}
        </div>

        {/* SEO-friendly content as a separate tab below (English) */}
  <section id="seo" className="w-full mt-8 animate-fade-in">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="flex border-b border-slate-700">
              <button
                type="button"
                className="px-4 py-3 text-sm font-medium text-slate-200 bg-slate-800/70 hover:bg-slate-800 focus:outline-none"
                aria-selected="true"
                role="tab"
              >
                SEO
              </button>
            </div>
            <div role="tabpanel" className="p-6 md:p-8 space-y-6">
              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700">
                <h2 className="text-xl md:text-2xl font-bold text-slate-100">Hashtags for Instagram, TikTok, YouTube, and X</h2>
                <p className="text-slate-400 mt-2">HyperHash generates high-potential, trend-aware hashtags based on your content, language, and preferred style—helping your posts reach the right audience.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700">
                <h2 className="text-xl md:text-2xl font-bold text-slate-100">How it works</h2>
                <p className="text-slate-400 mt-2">Enter your text, choose a platform and language, then select a style. HyperHash uses the Gemini model to produce exactly 15 suggestions, each with a brief reason and a trend score.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700">
                <h2 className="text-xl md:text-2xl font-bold text-slate-100">Highlights</h2>
                <ul className="list-disc list-inside text-slate-400 mt-2 space-y-1">
                  <li>Multilingual suggestions tailored to each platform</li>
                  <li>Comparable trend scores for quick decisions</li>
                  <li>One-click copy and CSV export</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;

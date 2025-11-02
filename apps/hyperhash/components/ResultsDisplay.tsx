
import React, { useState, useEffect } from 'react';
import { Hashtag } from '../types';
import HashtagCard from './HashtagCard';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface ResultsDisplayProps {
  hashtags: Hashtag[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ hashtags }) => {
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (copiedAll) {
      const timer = setTimeout(() => setCopiedAll(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedAll]);

  const handleCopyAll = () => {
    const allHashtags = hashtags.map(h => h.hashtag).join(' ');
    navigator.clipboard.writeText(allHashtags);
    setCopiedAll(true);
  };

  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-slate-700/50">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            ✨ Your Viral Hashtags
          </h2>
          <p className="text-slate-400 text-sm mt-1">{hashtags.length} hashtags generated</p>
        </div>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2.5 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 ring-2 ring-purple-400/20"
        >
          {copiedAll ? (
            <>
              <CheckIcon className="w-5 h-5" /> Copied All!
            </>
          ) : (
            <>
              <CopyIcon className="w-5 h-5" /> Copy All Hashtags
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hashtags.map((tag, index) => (
          <HashtagCard key={`${tag.hashtag}-${index}`} hashtagData={tag} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;


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
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          ✨ Generated Hashtags
        </h2>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          {copiedAll ? (
            <>
              <CheckIcon className="w-5 h-5" /> Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-5 h-5" /> Copy All
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hashtags.map((tag, index) => (
          <HashtagCard key={`${tag.hashtag}-${index}`} hashtagData={tag} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;

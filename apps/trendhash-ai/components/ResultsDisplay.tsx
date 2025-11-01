
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-200">Generated Hashtags</h2>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200"
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
          <HashtagCard key={`${tag.hashtag}-${index}`} hashtagData={tag} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;

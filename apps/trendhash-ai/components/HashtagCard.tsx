
import React, { useState, useEffect } from 'react';
import { Hashtag } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface HashtagCardProps {
  hashtagData: Hashtag;
}

const getScoreColor = (score: number): string => {
  if (score > 75) return 'bg-emerald-500';
  if (score > 50) return 'bg-yellow-500';
  return 'bg-rose-500';
};

const HashtagCard: React.FC<HashtagCardProps> = ({ hashtagData }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hashtagData.hashtag);
    setCopied(true);
  };

  const scoreColor = getScoreColor(hashtagData.trend_score);

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/50">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <p className="font-mono text-indigo-400 text-lg break-all">{hashtagData.hashtag}</p>
          <p className="text-slate-400 text-xs mt-2">{hashtagData.reason}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
          aria-label="Copy hashtag"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-emerald-400" />
          ) : (
            <CopyIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-slate-400">Trend Score</span>
          <span className={`text-sm font-bold ${getScoreColor(hashtagData.trend_score).replace('bg-','text-')}`}>
            {hashtagData.trend_score}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div
            className={`${scoreColor} h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${hashtagData.trend_score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HashtagCard;

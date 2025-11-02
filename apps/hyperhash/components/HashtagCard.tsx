
import React, { useState, useEffect } from 'react';
import { Hashtag } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface HashtagCardProps {
  hashtagData: Hashtag;
  index?: number;
}

const getScoreColor = (score: number): string => {
  if (score > 75) return 'bg-emerald-500';
  if (score > 50) return 'bg-yellow-500';
  return 'bg-rose-500';
};

const HashtagCard: React.FC<HashtagCardProps> = ({ hashtagData, index = 0 }) => {
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
    <div 
      className="bg-slate-800/50 backdrop-blur p-5 rounded-2xl border-2 border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/30 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <p className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-lg font-bold break-all group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">
            {hashtagData.hashtag}
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">{hashtagData.reason}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-xl text-slate-400 hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-200 hover:scale-110 active:scale-95"
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-slate-400">Trend Score</span>
          <span className={`text-sm font-bold px-2 py-0.5 rounded-lg ${scoreColor.replace('bg-','bg-')}/20 ${scoreColor.replace('bg-','text-')}`}>
            {hashtagData.trend_score}
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
          <div
            className={`${scoreColor} h-3 rounded-full transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${hashtagData.trend_score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HashtagCard;


import React, { useState, useEffect } from 'react';
import { Hashtag } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface HashtagCardProps {
  hashtagData: Hashtag;
  index?: number;
}

const getScoreColor = (score: number): string => {
  if (score > 75) return 'from-emerald-400 to-green-500';
  if (score > 50) return 'from-yellow-400 to-orange-500';
  return 'from-rose-400 to-red-500';
};

const getScoreBadgeColor = (score: number): string => {
  if (score > 75) return 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30';
  if (score > 50) return 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/30';
  return 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30';
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

  const scoreGradient = getScoreColor(hashtagData.trend_score);
  const scoreBadge = getScoreBadgeColor(hashtagData.trend_score);

  return (
    <div 
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-slate-700/60 transition-all duration-300 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-900/40 hover:-translate-y-2 group relative overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 transition-all duration-300 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1">
            <p className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-xl font-black break-all group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">
              {hashtagData.hashtag}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-200 hover:scale-110 active:scale-95 border border-slate-700/50 hover:border-purple-500/50"
            aria-label="Copy hashtag"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-emerald-400" />
            ) : (
              <CopyIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <p className="text-slate-400 text-sm mt-3 leading-relaxed line-clamp-2">{hashtagData.reason}</p>
        
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Trend Score</span>
            <span className={`text-sm font-bold px-3 py-1 rounded-xl ${scoreBadge}`}>
              {hashtagData.trend_score}
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div
              className={`bg-gradient-to-r ${scoreGradient} h-2.5 rounded-full transition-all duration-700 ease-out shadow-lg`}
              style={{ width: `${hashtagData.trend_score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagCard;

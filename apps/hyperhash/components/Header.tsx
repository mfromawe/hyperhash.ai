
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-block mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse-glow mx-auto">
          <span className="text-3xl font-black text-white">#</span>
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
        HyperHash
      </h1>
      <p className="mt-3 text-slate-400 text-base md:text-lg font-medium">
        Next-Gen AI Hashtag Generator • Powered by Gemini
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <a href="#root" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-800/70 border border-slate-700/70 text-slate-200 hover:bg-slate-700/70 hover:scale-105 transition-all duration-200 shadow-md">
          🚀 Generator
        </a>
        <a href="#seo" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/30">
          📊 Analytics
        </a>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
        HyperHash
      </h1>
      <p className="mt-2 text-slate-400">
        Next-Gen Hashtag Generator Powered by Gemini & Google Trends
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <a href="#root" className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-800/60 border border-slate-700 text-slate-200 hover:bg-slate-800 transition">
          Generator
        </a>
        <a href="#seo" className="px-4 py-2 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow">
          SEO
        </a>
      </div>
    </header>
  );
};

export default Header;

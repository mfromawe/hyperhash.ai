
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
    </header>
  );
};

export default Header;

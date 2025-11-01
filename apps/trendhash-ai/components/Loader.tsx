
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/50 rounded-lg">
      <div className="w-16 h-16 border-4 border-t-indigo-500 border-r-indigo-500 border-b-indigo-500/30 border-l-indigo-500/30 rounded-full animate-spin"></div>
      <p className="text-slate-300 font-medium">Generating viral hashtags...</p>
    </div>
  );
};

export default Loader;

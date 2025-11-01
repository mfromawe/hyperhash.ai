
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-auto">
      <p className="text-slate-500 text-sm">
        Built with React, Tailwind CSS, and the Gemini API.
      </p>
      <p className="text-slate-500 text-sm mt-1">
        A product of{' '}
        <a
          href="https://awecomp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-300"
        >
          awecomp.com
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

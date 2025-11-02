
import React, { useState } from 'react';
import { GenerationParams, Platform, Language, Style } from '../types';
import { PLATFORMS, LANGUAGES, STYLES } from '../constants';

interface InputFormProps {
  onSubmit: (params: GenerationParams) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [language, setLanguage] = useState<Language>('English');
  const [style, setStyle] = useState<Style>('Hybrid');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isLoading) {
      onSubmit({ content, platform, language, style });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
          Your Content or Idea
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g., A minimalist coffee shop with indoor plants and natural light..."
          className="w-full h-32 p-4 bg-slate-900/50 backdrop-blur border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none hover:border-slate-600"
          maxLength={1000}
          required
        />
        <p className="text-right text-xs text-slate-500 mt-1">{content.length}/1000</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">
            Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full p-3 bg-slate-900/50 backdrop-blur border-2 border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-slate-600 cursor-pointer"
          >
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-2">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full p-3 bg-slate-900/50 backdrop-blur border-2 border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-slate-600 cursor-pointer"
          >
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Hashtag Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                style === s
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-slate-700/50 backdrop-blur text-slate-300 hover:bg-slate-600/50 hover:scale-105 active:scale-95'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Generating Magic...
            </>
          ) : (
            <>
              ✨ Generate Hashtags
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"/>
      </button>
    </form>
  );
};

export default InputForm;

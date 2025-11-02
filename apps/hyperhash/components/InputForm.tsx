
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
    <form onSubmit={handleSubmit} className="w-full space-y-7">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Generate Viral Hashtags
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          AI-powered hashtag generation for maximum reach and engagement
        </p>
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span className="text-purple-400">📝</span> Your Content or Idea
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g., A minimalist coffee shop with indoor plants and natural light..."
          className="w-full h-36 p-4 bg-slate-900/70 backdrop-blur-sm border-2 border-slate-700/70 rounded-2xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-300 resize-none hover:border-slate-600 shadow-inner"
          maxLength={1000}
          required
        />
        <p className="text-right text-xs text-slate-500 mt-2">{content.length}/1000 characters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="platform" className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <span className="text-indigo-400">🎯</span> Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full p-3.5 bg-slate-900/70 backdrop-blur-sm border-2 border-slate-700/70 rounded-2xl text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-300 hover:border-slate-600 cursor-pointer shadow-inner appearance-none"
          >
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <span className="text-pink-400">🌍</span> Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full p-3.5 bg-slate-900/70 backdrop-blur-sm border-2 border-slate-700/70 rounded-2xl text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all duration-300 hover:border-slate-600 cursor-pointer shadow-inner appearance-none"
          >
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span className="text-purple-400">🎨</span> Hashtag Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                style === s
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105 ring-2 ring-purple-400/50'
                  : 'bg-slate-800/70 backdrop-blur text-slate-300 hover:bg-slate-700/70 hover:scale-105 hover:shadow-md active:scale-95'
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
        className="w-full py-5 px-6 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/50 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2.5">
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
              <span className="text-xl">✨</span> Generate Viral Hashtags
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"/>
      </button>
    </form>
  );
};

export default InputForm;

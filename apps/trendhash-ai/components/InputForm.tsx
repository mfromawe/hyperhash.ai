
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
          className="w-full h-32 p-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
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
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
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
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
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
              className={`py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                style === s
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
        className="w-full py-3 px-6 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {isLoading ? 'Generating...' : 'Generate Hashtags'}
      </button>
    </form>
  );
};

export default InputForm;

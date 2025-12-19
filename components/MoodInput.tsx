
import React, { useState } from 'react';

interface MoodInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MoodInput: React.FC<MoodInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pour your heart out... for example, 'I feel so tired today and just want something comforting.'"
          className="w-full h-32 p-4 bg-transparent border-2 border-[var(--accent-color)]/30 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all duration-300 text-[var(--text-color)] placeholder:text-[var(--text-color)]/60 resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text}
          className="w-full mt-4 px-6 py-3 bg-[var(--accent-color)] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Thinking...' : 'Find my comfort food'}
        </button>
      </form>
    </div>
  );
};

export default MoodInput;

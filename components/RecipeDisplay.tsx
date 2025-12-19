import React from 'react';
import type { MoodResponse, Recipe } from '../types';
import RecipeCard from './RecipeCard';
import SpotifyPlaylist from './SpotifyPlaylist';

interface RecipeDisplayProps {
  response: MoodResponse;
  onSaveRecipe: (recipe: Recipe) => void;
  onSaveToJournal: () => void;
  isJournalSaved: boolean;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ response, onSaveRecipe, onSaveToJournal, isJournalSaved }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <p className="text-lg uppercase tracking-widest" style={{ color: `var(--accent-color)` }}>
          Your Mood
        </p>
        <h2 className="text-5xl md:text-6xl font-bold font-serif mt-2" style={{ color: `var(--text-color)` }}>
          {response.mood}
        </h2>
        <div className="mt-6 flex justify-center">
            <button
                onClick={onSaveToJournal}
                disabled={isJournalSaved}
                className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-md border border-white/20 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: `var(--accent-color)`}} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="font-semibold text-[var(--text-color)]">{isJournalSaved ? 'Saved to Journal' : 'Save this Mood'}</span>
            </button>
        </div>
      </div>
      
      <SpotifyPlaylist playlistQuery={response.spotifyPlaylist} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} onSave={onSaveRecipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeDisplay;
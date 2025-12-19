import React from 'react';
import type { Recipe } from '../types';
import PublicRecipeCard from './PublicRecipeCard';

interface CommunityDisplayProps {
  publicRecipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
  onOpenAddRecipeModal: () => void;
}

const CommunityDisplay: React.FC<CommunityDisplayProps> = ({ publicRecipes, onSaveRecipe, onOpenAddRecipeModal }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--text-color)]">Community Kitchen</h1>
        <p className="text-lg opacity-80 mt-2 text-[var(--text-color)]">Discover and share recipes from food lovers like you.</p>
        <button
          onClick={onOpenAddRecipeModal}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-color)] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Share Your Recipe
        </button>
      </div>

      {publicRecipes.length === 0 ? (
        <div className="text-center max-w-lg mx-auto py-16">
          <h2 className="text-3xl font-bold font-serif mb-4 text-[var(--text-color)]">The Kitchen is Quiet... For Now</h2>
          <p className="text-lg opacity-80 text-[var(--text-color)]">
            Be the first to share a recipe with the community!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publicRecipes.map(recipe => (
            <PublicRecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onSave={onSaveRecipe} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityDisplay;

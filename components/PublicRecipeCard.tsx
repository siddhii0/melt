import React from 'react';
import type { Recipe } from '../types';

interface PublicRecipeCardProps {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
}

const PublicRecipeCard: React.FC<PublicRecipeCardProps> = ({ recipe, onSave }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--secondary-color)',
        borderColor: 'var(--accent-color)'
      }}
      className="rounded-2xl shadow-lg p-6 flex flex-col border-t-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-grow pr-2">
            <h3 className="text-2xl font-bold font-serif text-[var(--text-color)]">{recipe.title}</h3>
            {recipe.authorUsername && (
                <p className="text-sm font-semibold text-[var(--text-color)]/60 mt-1">
                    Shared by {recipe.authorUsername}
                </p>
            )}
        </div>
        <button
          onClick={() => onSave(recipe)}
          title="Save to collection"
          className="p-2 rounded-full hover:bg-[var(--accent-color)]/20 transition-colors duration-200 text-[var(--accent-color)] flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      <p className="text-[var(--text-color)]/80 mb-4">{recipe.description}</p>
      
      {recipe.flavorProfile && recipe.flavorProfile.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-[var(--text-color)]">Flavor Profile:</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.flavorProfile.map((flavor) => (
              <span
                key={flavor}
                className="px-2.5 py-1 text-xs font-bold rounded-full capitalize tracking-wide"
                style={{ backgroundColor: 'var(--accent-color)', color: 'var(--secondary-color)' }}
              >
                {flavor}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <h4 className="font-semibold mb-2 text-[var(--text-color)]">Ingredients:</h4>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-[var(--text-color)]/90">{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicRecipeCard;

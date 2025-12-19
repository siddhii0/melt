import React from 'react';
import type { Collection, Recipe } from '../types';

interface CollectionsDisplayProps {
  collections: Collection[];
  onRemoveRecipe: (recipeId: string, collectionId: string, recipeTitle: string) => void;
  onDeleteCollection: (collectionId: string) => void;
}

const CollectionRecipeCard: React.FC<{ recipe: Recipe; onRemove: () => void; }> = ({ recipe, onRemove }) => {
  return (
    <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg flex justify-between items-center gap-4">
      <div className="flex-grow">
        <h4 className="font-bold font-serif text-[var(--text-color)]">{recipe.title}</h4>
        <p className="text-sm opacity-80 text-[var(--text-or-color)] mt-1 mb-3">{recipe.description}</p>
        {recipe.flavorProfile && recipe.flavorProfile.length > 0 && (
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
        )}
      </div>
      <button 
        onClick={onRemove} 
        title="Remove recipe from collection" 
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
        </svg>
        Remove
      </button>
    </div>
  );
};

const CollectionsDisplay: React.FC<CollectionsDisplayProps> = ({ collections, onRemoveRecipe, onDeleteCollection }) => {
  if (collections.length === 0) {
    return (
      <div className="text-center max-w-lg mx-auto py-16 animate-fade-in">
        <h2 className="text-3xl font-bold font-serif mb-4 text-[var(--text-color)]">Your Recipe Box is Empty</h2>
        <p className="text-lg opacity-80 text-[var(--text-color)]">
          Find some recipes that match your mood and save them here for later!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-[var(--text-color)]">My Collections</h1>
      {collections.map(collection => (
        <section key={collection.id} className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-6 border-t-4" style={{ borderColor: 'var(--accent-color)' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold font-serif text-[var(--text-color)]">{collection.name}</h3>
            <button onClick={() => onDeleteCollection(collection.id)} title="Delete collection" className="p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
            </button>
          </div>
          <div className="space-y-4">
            {collection.recipes.map(recipe => (
              <CollectionRecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onRemove={() => onRemoveRecipe(recipe.id, collection.id, recipe.title)} 
              />
            ))}
             {collection.recipes.length === 0 && (
                <p className="text-center py-4 opacity-70 text-[var(--text-color)]">This collection is empty. Add recipes from the main page.</p>
             )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CollectionsDisplay;
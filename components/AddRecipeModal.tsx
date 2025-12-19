import React, { useState, useEffect } from 'react';
import type { Recipe } from '../types';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipe: (recipeData: Omit<Recipe, 'id' | 'authorId' | 'authorUsername'>) => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, onClose, onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setIngredients('');
      setFlavorProfile('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !ingredients.trim()) {
      setError('Title, description, and ingredients are required.');
      return;
    }
    
    const recipeData = {
      title,
      description,
      ingredients: ingredients.split('\n').filter(line => line.trim() !== ''),
      flavorProfile: flavorProfile.split(',').map(f => f.trim()).filter(f => f !== ''),
    };

    onAddRecipe(recipeData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-recipe-title">
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <h2 id="add-recipe-title" className="text-2xl font-bold font-serif mb-4">Share Your Recipe</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="recipe-title" className="block text-sm font-semibold mb-1">Recipe Title</label>
            <input
              id="recipe-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 'Grandma's Comforting Chicken Soup'"
              className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="recipe-description" className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              id="recipe-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short, enticing description of the dish."
              rows={3}
              className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            />
          </div>
           <div>
            <label htmlFor="recipe-ingredients" className="block text-sm font-semibold mb-1">Ingredients (one per line)</label>
            <textarea
              id="recipe-ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="1 cup of love&#10;2 tbsp of happiness&#10;..."
              rows={5}
              className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            />
          </div>
           <div>
            <label htmlFor="recipe-flavor-profile" className="block text-sm font-semibold mb-1">Flavor Profile (comma-separated)</label>
            <input
              id="recipe-flavor-profile"
              type="text"
              value={flavorProfile}
              onChange={(e) => setFlavorProfile(e.target.value)}
              placeholder="e.g., 'savory, umami, comforting'"
              className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </form>
        
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Share Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;

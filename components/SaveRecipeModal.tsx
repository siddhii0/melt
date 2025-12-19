import React, { useState, useEffect } from 'react';
import type { Collection } from '../types';

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionName: string) => void;
  collections: Collection[];
  recipeTitle: string;
}

const SaveRecipeModal: React.FC<SaveRecipeModalProps> = ({ isOpen, onClose, onSave, collections, recipeTitle }) => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (collections.length > 0) {
        setSelectedCollection(collections[0].name);
      } else {
        setSelectedCollection('new');
      }
      setNewCollectionName('');
    }
  }, [collections, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (selectedCollection === 'new') {
        if (newCollectionName.trim()) {
            onSave(newCollectionName.trim());
        }
    } else if (selectedCollection) {
      onSave(selectedCollection);
    }
  };
  
  const isSaveDisabled = selectedCollection === 'new' && !newCollectionName.trim();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="save-modal-title">
      <div className="bg-[var(--secondary-color)] text-[var(--text-color)] rounded-2xl shadow-xl p-8 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <h2 id="save-modal-title" className="text-2xl font-bold font-serif mb-2">Save Recipe</h2>
        <p className="mb-6">Add "<span className="font-semibold">{recipeTitle}</span>" to a collection.</p>
        
        <div className="space-y-4">
          {collections.length > 0 && (
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full p-3 bg-transparent border-2 border-[var(--accent-color)]/30 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
              aria-label="Select a collection"
            >
              {collections.map(col => (
                <option key={col.id} value={col.name}>{col.name}</option>
              ))}
              <option value="new">-- Create a new collection --</option>
            </select>
          )}

          {(selectedCollection === 'new' || collections.length === 0) && (
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g., 'Rainy Day Snacks'"
              className="w-full p-3 bg-transparent border-2 border-[var(--accent-color)]/30 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
              aria-label="New collection name"
            />
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-6 py-2 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="px-6 py-2 bg-[var(--accent-color)] text-white font-semibold rounded-lg shadow-md hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRecipeModal;

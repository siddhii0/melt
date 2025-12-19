import React from 'react';
import type { MoodEntry } from '../types';

interface JournalDisplayProps {
  entries: MoodEntry[];
  onDeleteEntry: (id: string) => void;
}

const JournalEntryCard: React.FC<{ entry: MoodEntry; onDelete: () => void; }> = ({ entry, onDelete }) => {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(entry.spotifyPlaylist)}`;

  return (
    <article 
      className="bg-[var(--secondary-color)] rounded-2xl shadow-lg p-6 border-t-4" 
      style={{
        '--secondary-color': entry.colorPalette.secondary,
        '--text-color': entry.colorPalette.text,
        '--accent-color': entry.colorPalette.accent,
        borderColor: entry.colorPalette.accent,
      } as React.CSSProperties}
    >
       <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: entry.colorPalette.accent }}>{formattedDate}</p>
          <h3 className="text-3xl font-bold font-serif text-[var(--text-color)]">{entry.mood}</h3>
        </div>
        <button onClick={onDelete} title="Delete this entry" className="p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
      </div>

      <blockquote className="border-l-4 pl-4 italic my-4" style={{ borderColor: entry.colorPalette.accent }}>
        <p className="text-[var(--text-color)]/90">"{entry.journalText}"</p>
      </blockquote>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-[var(--text-color)]">Recipes you discovered:</h4>
          <ul className="list-disc list-inside space-y-1">
              {entry.recipes.map(recipe => (
                  <li key={recipe.id} className="text-[var(--text-color)]/80">{recipe.title}</li>
              ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[var(--text-color)]">Soundtrack for the moment:</h4>
          <a
            href={spotifySearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-lg hover:bg-black/10 transition-colors duration-200"
          >
            <svg role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#1DB954]">
                <title>Spotify</title>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.585a.625.625 0 01-.88.22l-4.14-2.54a.622.622 0 01-.312-.54V9.015a.625.625 0 011.25 0v4.867l3.72 2.28a.625.625 0 01.22.88zm-1.74-5.385c.345 0 .625.28.625.625s-.28.625-.625.625a.625.625 0 01-.625-.625c0-.345.28-.625.625-.625zm-2.845-2.26c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75zm-3.094-1.28c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path>
            </svg>
            <span className="font-medium text-[var(--text-color)]/90">{entry.spotifyPlaylist}</span>
          </a>
        </div>
      </div>
    </article>
  );
};

const JournalDisplay: React.FC<JournalDisplayProps> = ({ entries, onDeleteEntry }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center max-w-lg mx-auto py-16 animate-fade-in">
        <h2 className="text-3xl font-bold font-serif mb-4 text-[var(--text-color)]">Your Mood Journal is Blank</h2>
        <p className="text-lg opacity-80 text-[var(--text-color)]">
          Describe your mood on the home page and save your moments here to track your culinary journey.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-[var(--text-color)]">My Mood Journal</h1>
      {entries.map(entry => (
        <JournalEntryCard 
          key={entry.id} 
          entry={entry}
          onDelete={() => onDeleteEntry(entry.id)}
        />
      ))}
    </div>
  );
};

export default JournalDisplay;
import React from 'react';
import type { SpotifyTrack, DrinkSuggestion } from '../types';

interface NowPlayingDisplayProps {
  track: SpotifyTrack;
  suggestion: DrinkSuggestion | null;
  isFetchingSuggestion: boolean;
}

const NowPlayingDisplay: React.FC<NowPlayingDisplayProps> = ({ track, suggestion, isFetchingSuggestion }) => {
  const albumArtUrl = track.album.images[0]?.url;

  return (
    <div 
        className="fixed bottom-4 right-4 w-full max-w-sm bg-[var(--secondary-color)]/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-[var(--text-color)] overflow-hidden animate-fade-in-up z-40"
    >
      <div className="flex items-center gap-4 p-4">
        {albumArtUrl && (
          <img src={albumArtUrl} alt={track.album.name} className="w-24 h-24 rounded-lg shadow-md flex-shrink-0" />
        )}
        <div className="flex-grow min-w-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)]">Now Playing</p>
            <h3 className="text-lg font-bold truncate" title={track.name}>{track.name}</h3>
            <p className="text-sm opacity-80 truncate" title={track.artists.map(a => a.name).join(', ')}>
              {track.artists.map(a => a.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black/10 px-4 py-3">
          {isFetchingSuggestion && (
             <div className="flex items-center gap-2 animate-pulse">
                <div className="w-5 h-5 bg-[var(--accent-color)]/30 rounded-full animate-ping-slow"></div>
                <p className="text-sm font-semibold opacity-70">Pairing a drink...</p>
             </div>
          )}
          {suggestion && !isFetchingSuggestion && (
            <div className="animate-fade-in">
                <h4 className="text-sm font-bold text-[var(--accent-color)]">{suggestion.drinkName}</h4>
                <p className="text-xs opacity-90 mt-1">{suggestion.drinkDescription}</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default NowPlayingDisplay;

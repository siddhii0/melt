import React from 'react';

interface SpotifyPlaylistProps {
  playlistQuery: string;
}

const SpotifyPlaylist: React.FC<SpotifyPlaylistProps> = ({ playlistQuery }) => {
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(playlistQuery)}`;

  return (
    <div className="mb-12 text-center animate-fade-in-up">
      <p className="text-sm uppercase tracking-widest mb-2" style={{ color: `var(--accent-color)` }}>
        Vibe Check
      </p>
      <a
        href={spotifySearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 px-6 py-4 bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-md border border-white/20 hover:bg-white transition-all duration-300 group max-w-sm mx-auto"
      >
        <svg role="img" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#1DB954] flex-shrink-0">
          <title>Spotify</title>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.585a.625.625 0 01-.88.22l-4.14-2.54a.622.622 0 01-.312-.54V9.015a.625.625 0 011.25 0v4.867l3.72 2.28a.625.625 0 01.22.88zm-1.74-5.385c.345 0 .625.28.625.625s-.28.625-.625.625a.625.625 0 01-.625-.625c0-.345.28-.625.625-.625zm-2.845-2.26c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75zm-3.094-1.28c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z" />
        </svg>
        <div className="text-left">
          <p className="font-semibold text-lg text-[var(--text-color)]">
            {playlistQuery}
          </p>
          <p className="text-sm text-[var(--text-color)]/70">
            Listen on Spotify
          </p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-color)]/50 ml-auto transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
};

export default SpotifyPlaylist;
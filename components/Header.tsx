import React from 'react';
import type { SpotifyUser, User } from '../types';

interface HeaderProps {
  onViewChange: (view: 'main' | 'collections' | 'journal' | 'community' | 'admin') => void;
  currentView: 'main' | 'collections' | 'journal' | 'community' | 'admin';
  onReset: () => void;
  showReset: boolean;
  currentUser: User;
  onLogout: () => void;
  spotifyUser: SpotifyUser | null;
  onSpotifyLogin: () => void;
  onSpotifyLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onViewChange, 
  currentView, 
  onReset, 
  showReset,
  currentUser,
  onLogout,
  spotifyUser,
  onSpotifyLogin,
  onSpotifyLogout
}) => {
  return (
    <header className="py-4 px-4 md:px-8 flex justify-between items-center transition-opacity duration-500 z-10 relative">
      <h1
        onClick={() => onViewChange('main')}
        title="Go to Home"
        className="text-2xl md:text-3xl font-bold font-serif tracking-tight cursor-pointer bg-gradient-to-r from-sunset to-raspberry text-transparent bg-clip-text"
      >
        MELT.
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        {currentUser.username === 'admin' && currentView !== 'admin' && (
          <button
            onClick={() => onViewChange('admin')}
            className="hidden sm:inline-block px-4 py-2 bg-yellow-500/80 dark:bg-yellow-700/50 backdrop-blur-sm rounded-lg shadow-sm hover:bg-yellow-500 transition-all duration-300 font-semibold text-sm text-white"
          >
            Admin
          </button>
        )}
        {currentView !== 'community' && (
          <button
            onClick={() => onViewChange('community')}
            className="hidden sm:inline-block px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/80 transition-all duration-300 font-semibold text-sm text-[var(--text-color)]"
          >
            Community
          </button>
        )}
        {currentView !== 'journal' && (
          <button
            onClick={() => onViewChange('journal')}
            className="hidden sm:inline-block px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/80 transition-all duration-300 font-semibold text-sm text-[var(--text-color)]"
          >
            My Journal
          </button>
        )}
        {currentView !== 'collections' && (
          <button
            onClick={() => onViewChange('collections')}
            className="hidden sm:inline-block px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/80 transition-all duration-300 font-semibold text-sm text-[var(--text-color)]"
          >
            My Collections
          </button>
        )}
        {!spotifyUser && (
            <button
                onClick={onSpotifyLogin}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity duration-300 font-semibold text-sm"
            >
                <svg role="img" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.585a.625.625 0 01-.88.22l-4.14-2.54a.622.622 0 01-.312-.54V9.015a.625.625 0 011.25 0v4.867l3.72 2.28a.625.625 0 01.22.88zm-1.74-5.385c.345 0 .625.28.625.625s-.28.625-.625.625a.625.625 0 01-.625-.625c0-.345.28-.625.625-.625zm-2.845-2.26c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75zm-3.094-1.28c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path></svg>
                Connect Spotify
            </button>
        )}
         {showReset && (
           <button
             onClick={onReset}
             className="px-4 py-2 bg-gray-500/50 text-[var(--text-color)] rounded-lg hover:bg-gray-500/70 transition-colors duration-300 font-semibold text-sm"
           >
             Start Over
           </button>
        )}
        
        <div className="group relative">
          <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg shadow-sm font-semibold text-sm text-[var(--text-color)] p-2 cursor-pointer">
            <span>{currentUser.username}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--secondary-color)] rounded-lg shadow-xl border border-white/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
            {!spotifyUser && (
               <div className="sm:hidden border-b border-[var(--text-color)]/10 pb-2 mb-2">
                 <button
                    onClick={onSpotifyLogin}
                    className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-[var(--text-color)] rounded-md hover:bg-[var(--text-color)]/10 transition-colors"
                  >
                    <svg role="img" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#1DB954]"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.585a.625.625 0 01-.88.22l-4.14-2.54a.622.622 0 01-.312-.54V9.015a.625.625 0 011.25 0v4.867l3.72 2.28a.625.625 0 01.22.88zm-1.74-5.385c.345 0 .625.28.625.625s-.28.625-.625.625a.625.625 0 01-.625-.625c0-.345.28-.625.625-.625zm-2.845-2.26c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75zm-3.094-1.28c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 01-.75-.75c0-.414.336-.75.75-.75z"></path></svg>
                    <span>Connect Spotify</span>
                  </button>
               </div>
            )}
            {spotifyUser && (
               <div className="border-b border-[var(--text-color)]/10 pb-2 mb-2">
                 <div className="flex items-center gap-2 px-3 py-2 text-left">
                    {spotifyUser.images?.[0]?.url && (
                        <img src={spotifyUser.images[0].url} alt={spotifyUser.display_name} className="w-6 h-6 rounded-full" />
                    )}
                    <span className="truncate font-semibold">{spotifyUser.display_name}</span>
                 </div>
                 <button
                    onClick={onSpotifyLogout}
                    className="w-full text-left px-3 py-1 text-xs text-[var(--text-color)]/70 rounded-md hover:bg-[var(--text-color)]/10 transition-colors"
                  >
                    Disconnect Spotify
                  </button>
               </div>
            )}
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-red-600 rounded-md hover:bg-red-500/10 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
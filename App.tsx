import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getMoodAndRecipes, getDrinkSuggestion } from './services/geminiService';
import { getLoginUrl, getUserProfile, getCurrentlyPlaying } from './services/spotifyService';
import type { MoodResponse, Recipe, Collection, MoodEntry, SpotifyUser, CurrentlyPlaying, DrinkSuggestion, User } from './types';
import Header from './components/Header';
import MoodInput from './components/MoodInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import SaveRecipeModal from './components/SaveRecipeModal';
import CollectionsDisplay from './components/CollectionsDisplay';
import ConfirmationModal from './components/ConfirmationModal';
import JournalDisplay from './components/JournalDisplay';
import NowPlayingDisplay from './components/NowPlayingDisplay';
import AuthPage from './components/AuthPage';
import CommunityDisplay from './components/CommunityDisplay';
import AddRecipeModal from './components/AddRecipeModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('meltCurrentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // App State
  const [moodResponse, setMoodResponse] = useState<MoodResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'main' | 'collections' | 'journal' | 'community' | 'admin'>('main');

  // User-specific data state
  const [collections, setCollections] = useState<Collection[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  
  // Public data state
  const [publicRecipes, setPublicRecipes] = useState<Recipe[]>(() => {
    try {
      const savedPublicRecipes = localStorage.getItem('meltPublicRecipes');
      return savedPublicRecipes ? JSON.parse(savedPublicRecipes) : [];
    } catch {
      return [];
    }
  });
  
  // Admin state
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [allHistory, setAllHistory] = useState<MoodEntry[]>([]);


  // Modal & Temp State
  const [currentJournalText, setCurrentJournalText] = useState<string>('');
  const [isCurrentMoodSaved, setIsCurrentMoodSaved] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);
  const [recipeToSave, setRecipeToSave] = useState<Recipe | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [collectionToDeleteId, setCollectionToDeleteId] = useState<string | null>(null);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState<boolean>(false);
  const [recipeToRemove, setRecipeToRemove] = useState<{ recipeId: string; collectionId: string; recipeTitle: string; } | null>(null);
  const [isJournalDeleteConfirmOpen, setIsJournalDeleteConfirmOpen] = useState<boolean>(false);
  const [journalEntryToDeleteId, setJournalEntryToDeleteId] = useState<string | null>(null);

  // Spotify State
  const [spotifyToken, setSpotifyToken] = useState<string | null>(() => localStorage.getItem('spotifyToken'));
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);
  const [drinkSuggestion, setDrinkSuggestion] = useState<DrinkSuggestion | null>(null);
  const [isFetchingDrink, setIsFetchingDrink] = useState<boolean>(false);
  const pollingIntervalRef = useRef<number | null>(null);
  
  // --- AUTH LOGIC ---
  const handleLogin = (username: string, password: string): boolean => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('meltUsers') || '[]');
    const user = allUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('meltCurrentUser', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (username: string, password: string): boolean => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('meltUsers') || '[]');
    if (allUsers.some(u => u.username === username)) {
      return false; // User exists
    }
    const newUser: User = { id: `${Date.now()}-user`, username, password };
    allUsers.push(newUser);
    localStorage.setItem('meltUsers', JSON.stringify(allUsers));
    localStorage.setItem('meltCurrentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    // App Logout
    localStorage.removeItem('meltCurrentUser');
    setCurrentUser(null);
    setCollections([]);
    setMoodHistory([]);
    setCurrentView('main');
    
    // Spotify Logout
    handleSpotifyLogout();
  };
  
  // --- DATA MANAGEMENT ---
  useEffect(() => {
    if (currentUser) {
      // Load user's data
      const allCollections: Collection[] = JSON.parse(localStorage.getItem('meltAllCollections') || '[]');
      setCollections(allCollections.filter(c => c.userId === currentUser.id));
      
      const allHistory: MoodEntry[] = JSON.parse(localStorage.getItem('meltAllHistory') || '[]');
      setMoodHistory(allHistory.filter(h => h.userId === currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const allCollections: Collection[] = JSON.parse(localStorage.getItem('meltAllCollections') || '[]');
      const otherUsersCollections = allCollections.filter(c => c.userId !== currentUser.id);
      localStorage.setItem('meltAllCollections', JSON.stringify([...otherUsersCollections, ...collections]));
    }
  }, [collections, currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      const allHistory: MoodEntry[] = JSON.parse(localStorage.getItem('meltAllHistory') || '[]');
      const otherUsersHistory = allHistory.filter(h => h.userId !== currentUser.id);
      localStorage.setItem('meltAllHistory', JSON.stringify([...otherUsersHistory, ...moodHistory]));
    }
  }, [moodHistory, currentUser]);

  useEffect(() => {
      localStorage.setItem('meltPublicRecipes', JSON.stringify(publicRecipes));
  }, [publicRecipes]);


  // --- SPOTIFY LOGIC ---
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('spotifyToken', token);
        setSpotifyToken(token);
        window.location.hash = '';
      }
    }
  }, []);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      if (spotifyToken && currentUser) {
        try {
          const user = await getUserProfile(spotifyToken);
          setSpotifyUser(user);
        } catch (e) {
          console.error("Spotify token expired or invalid", e);
          handleSpotifyLogout();
        }
      }
    };
    fetchSpotifyData();
  }, [spotifyToken, currentUser]);

  const pollCurrentlyPlaying = useCallback(async () => {
      if (!spotifyToken) return;
      try {
        const track = await getCurrentlyPlaying(spotifyToken);
        setCurrentlyPlaying(prev => {
            if (prev?.item?.id !== track?.item?.id) {
                setDrinkSuggestion(null);
                return track;
            }
            return track;
        });
      } catch (e) {
          console.error("Error fetching currently playing", e);
          handleSpotifyLogout();
      }
  }, [spotifyToken]);

  useEffect(() => {
    if (spotifyToken && currentUser) {
      pollCurrentlyPlaying();
      pollingIntervalRef.current = window.setInterval(pollCurrentlyPlaying, 5000);
    }
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [spotifyToken, currentUser, pollCurrentlyPlaying]);

  useEffect(() => {
      const fetchDrink = async () => {
        if (currentlyPlaying?.is_playing && currentlyPlaying.item && !drinkSuggestion && !isFetchingDrink) {
            setIsFetchingDrink(true);
            try {
                const suggestion = await getDrinkSuggestion(
                    currentlyPlaying.item.name,
                    currentlyPlaying.item.artists[0].name,
                    moodResponse?.mood || 'neutral'
                );
                setDrinkSuggestion(suggestion);
            } catch (err) {
                console.error("Error fetching drink suggestion", err);
            } finally {
                setIsFetchingDrink(false);
            }
        }
      };
      fetchDrink();
  }, [currentlyPlaying, drinkSuggestion, moodResponse, isFetchingDrink]);

  const handleSpotifyLogin = () => {
    window.location.href = getLoginUrl();
  };

  const handleSpotifyLogout = () => {
    localStorage.removeItem('spotifyToken');
    setSpotifyToken(null);
    setSpotifyUser(null);
    setCurrentlyPlaying(null);
    setDrinkSuggestion(null);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
  };


  // --- APP HANDLERS ---
  const handleJournalSubmit = useCallback(async (journalText: string) => {
    if (!journalText.trim()) {
      setError("Please enter how you're feeling.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setMoodResponse(null);
    setCurrentView('main');
    setCurrentJournalText(journalText);
    setIsCurrentMoodSaved(false);

    try {
      const response = await getMoodAndRecipes(journalText);
      setMoodResponse(response);
    } catch (err) {
      console.error(err);
      setError('Sorry, I had trouble understanding that. Could you try again?');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setMoodResponse(null);
    setError(null);
    setCurrentJournalText('');
    setIsCurrentMoodSaved(false);
  };
  
  const handleViewChange = (view: 'main' | 'collections' | 'journal' | 'community' | 'admin') => {
    if (view === 'main' && currentView !== 'main') {
      handleReset();
    }
    if (view === 'admin') {
      // Load all data for the admin view
      setAllUsers(JSON.parse(localStorage.getItem('meltUsers') || '[]'));
      setAllCollections(JSON.parse(localStorage.getItem('meltAllCollections') || '[]'));
      setAllHistory(JSON.parse(localStorage.getItem('meltAllHistory') || '[]'));
    }
    setCurrentView(view);
  };

  const handleOpenSaveModal = (recipe: Recipe) => {
    setRecipeToSave(recipe);
    setIsSaveModalOpen(true);
  };

  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
    setRecipeToSave(null);
  };

  const handleSaveToCollection = (collectionName: string) => {
    if (!recipeToSave || !currentUser) return;

    setCollections(prevCollections => {
      const existingCollection = prevCollections.find(c => c.name.toLowerCase() === collectionName.toLowerCase());

      if (existingCollection) {
        const isRecipeAlreadyIn = existingCollection.recipes.some(r => r.id === recipeToSave.id);
        if (isRecipeAlreadyIn) return prevCollections;

        return prevCollections.map(c =>
          c.id === existingCollection.id
            ? { ...c, recipes: [...c.recipes, recipeToSave] }
            : c
        );
      } else {
        const newCollection: Collection = {
          id: `${Date.now()}-col-${collectionName}`,
          userId: currentUser.id,
          name: collectionName,
          recipes: [recipeToSave],
        };
        return [...prevCollections, newCollection];
      }
    });

    handleCloseSaveModal();
  };
  
  const handleRemoveFromCollection = (recipeId: string, collectionId: string) => {
    setCollections(prev => prev.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          recipes: collection.recipes.filter(recipe => recipe.id !== recipeId)
        };
      }
      return collection;
    }));
  };
  
  const handleDeleteCollection = (collectionId: string) => {
    setCollectionToDeleteId(collectionId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (collectionToDeleteId) {
        setCollections(prev => prev.filter(collection => collection.id !== collectionToDeleteId));
    }
    setIsDeleteConfirmOpen(false);
    setCollectionToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setCollectionToDeleteId(null);
  };

  const handleOpenRemoveConfirm = (recipeId: string, collectionId: string, recipeTitle: string) => {
    setRecipeToRemove({ recipeId, collectionId, recipeTitle });
    setIsRemoveConfirmOpen(true);
  };

  const handleCancelRemove = () => {
    setIsRemoveConfirmOpen(false);
    setRecipeToRemove(null);
  };

  const handleConfirmRemove = () => {
    if (recipeToRemove) {
      handleRemoveFromCollection(recipeToRemove.recipeId, recipeToRemove.collectionId);
    }
    handleCancelRemove();
  };
  
  const handleSaveToJournal = () => {
    if (!moodResponse || !currentJournalText || isCurrentMoodSaved || !currentUser) return;

    const newEntry: MoodEntry = {
      id: `${Date.now()}-mood-${Math.random()}`,
      userId: currentUser.id,
      date: new Date().toISOString(),
      journalText: currentJournalText,
      mood: moodResponse.mood,
      colorPalette: moodResponse.colorPalette,
      recipes: moodResponse.recipes,
      spotifyPlaylist: moodResponse.spotifyPlaylist,
    };
    
    setMoodHistory(prev => [newEntry, ...prev]);
    setIsCurrentMoodSaved(true);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntryToDeleteId(id);
    setIsJournalDeleteConfirmOpen(true);
  };
  
  const handleConfirmJournalDelete = () => {
    if (journalEntryToDeleteId) {
      setMoodHistory(prev => prev.filter(entry => entry.id !== journalEntryToDeleteId));
    }
    setIsJournalDeleteConfirmOpen(false);
    setJournalEntryToDeleteId(null);
  };

  const handleCancelJournalDelete = () => {
    setIsJournalDeleteConfirmOpen(false);
    setJournalEntryToDeleteId(null);
  };
  
  const handleAddPublicRecipe = (recipeData: Omit<Recipe, 'id' | 'authorId' | 'authorUsername'>) => {
    if (!currentUser) return;
    
    const newPublicRecipe: Recipe = {
      ...recipeData,
      id: `${Date.now()}-public-${Math.random().toString(36).substr(2, 9)}`,
      authorId: currentUser.id,
      authorUsername: currentUser.username,
    };
    
    setPublicRecipes(prev => [newPublicRecipe, ...prev]);
    setIsAddRecipeModalOpen(false);
  };

  // --- RENDER LOGIC ---
  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
  }
  
  const palette = moodResponse?.colorPalette;
  const dynamicStyles = {
    '--primary-color': palette?.primary || '#F3F4F6',
    '--secondary-color': palette?.secondary || '#FFFFFF',
    '--text-color': palette?.text || '#1F2937',
    '--accent-color': palette?.accent || '#FF4C8B',
  } as React.CSSProperties;

  return (
    <div
      style={dynamicStyles}
      className="min-h-screen bg-[var(--primary-color)] text-[var(--text-color)] transition-colors duration-1000 ease-in-out"
    >
      <Header
        onViewChange={handleViewChange}
        currentView={currentView}
        onReset={handleReset}
        showReset={!!moodResponse && currentView === 'main'}
        currentUser={currentUser}
        onLogout={handleLogout}
        spotifyUser={spotifyUser}
        onSpotifyLogin={handleSpotifyLogin}
        onSpotifyLogout={handleSpotifyLogout}
      />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {currentView === 'collections' && (
          <CollectionsDisplay
            collections={collections}
            onRemoveRecipe={handleOpenRemoveConfirm}
            onDeleteCollection={handleDeleteCollection}
          />
        )}
        
        {currentView === 'journal' && (
           <JournalDisplay
             entries={moodHistory}
             onDeleteEntry={handleDeleteJournalEntry}
           />
        )}
        
        {currentView === 'community' && (
          <CommunityDisplay
            publicRecipes={publicRecipes}
            onSaveRecipe={handleOpenSaveModal}
            onOpenAddRecipeModal={() => setIsAddRecipeModalOpen(true)}
          />
        )}
        
        {currentView === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            users={allUsers}
            collections={allCollections}
            history={allHistory}
          />
        )}

        {currentView === 'main' && (
          <>
            {!moodResponse && !isLoading && (
              <div className="text-center max-w-2xl mx-auto animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Welcome back, {currentUser.username}!</h1>
                <p className="text-lg md:text-xl mb-8">
                  How are you feeling today?
                </p>
              </div>
            )}

            {!moodResponse && !isLoading && (
              <MoodInput onSubmit={handleJournalSubmit} isLoading={isLoading} />
            )}

            {isLoading && <LoadingSpinner />}
            
            {error && (
                <div className="text-center max-w-lg mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
                    <p>{error}</p>
                </div>
            )}

            {moodResponse && !isLoading && (
              <RecipeDisplay
                response={moodResponse}
                onSaveRecipe={handleOpenSaveModal}
                onSaveToJournal={handleSaveToJournal}
                isJournalSaved={isCurrentMoodSaved}
              />
            )}
          </>
        )}
      </main>
      
      {currentlyPlaying?.is_playing && currentlyPlaying.item && (
        <NowPlayingDisplay 
            track={currentlyPlaying.item}
            suggestion={drinkSuggestion}
            isFetchingSuggestion={isFetchingDrink}
        />
      )}
      
      <AddRecipeModal
        isOpen={isAddRecipeModalOpen}
        onClose={() => setIsAddRecipeModalOpen(false)}
        onAddRecipe={handleAddPublicRecipe}
      />

      {isSaveModalOpen && recipeToSave && (
        <SaveRecipeModal
          isOpen={isSaveModalOpen}
          onClose={handleCloseSaveModal}
          onSave={handleSaveToCollection}
          collections={collections}
          recipeTitle={recipeToSave.title}
        />
      )}
      
      {isDeleteConfirmOpen && collectionToDeleteId && (
        <ConfirmationModal
          isOpen={isDeleteConfirmOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete Collection"
          message={`Are you sure you want to delete the "${collections.find(c => c.id === collectionToDeleteId)?.name}" collection? This will permanently remove all recipes within it.`}
        />
      )}

      {isRemoveConfirmOpen && recipeToRemove && (
        <ConfirmationModal
          isOpen={isRemoveConfirmOpen}
          onClose={handleCancelRemove}
          onConfirm={handleConfirmRemove}
          title="Remove Recipe"
          message={`Are you sure you want to remove "${recipeToRemove.recipeTitle}" from this collection?`}
        />
      )}
      
      {isJournalDeleteConfirmOpen && journalEntryToDeleteId && (
        <ConfirmationModal
          isOpen={isJournalDeleteConfirmOpen}
          onClose={handleCancelJournalDelete}
          onConfirm={handleConfirmJournalDelete}
          title="Delete Journal Entry"
          message="Are you sure you want to permanently delete this journal entry?"
        />
      )}
    </div>
  );
};

export default App;
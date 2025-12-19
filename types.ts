export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  flavorProfile?: string[];
  authorId?: string;
  authorUsername?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  text: string;
  accent: string;
}

export interface MoodResponse {
  mood: string;
  colorPalette: ColorPalette;
  recipes: Recipe[];
  spotifyPlaylist: string;
}

export interface User {
  id: string;
  username: string;
  password?: string; // In a real app, this would be handled securely on a backend
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  recipes: Recipe[];
}

export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  journalText: string;
  mood: string;
  colorPalette: ColorPalette;
  recipes: Recipe[];
  spotifyPlaylist: string;
}

// Spotify Integration Types
export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

export interface CurrentlyPlaying {
  item: SpotifyTrack;
  is_playing: boolean;
}

export interface DrinkSuggestion {
  drinkName: string;
  drinkDescription: string;
}

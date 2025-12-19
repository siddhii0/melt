import type { SpotifyUser, CurrentlyPlaying } from '../types';

const CLIENT_ID = '07e6008953184b29837a5084a4b4119d'; // A public client ID for demo purposes
const REDIRECT_URI = window.location.origin + window.location.pathname;
const SCOPES = 'user-read-currently-playing playlist-read-private playlist-read-collaborative';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

export const getLoginUrl = (): string => {
  return AUTH_URL;
};

const callSpotifyApi = async <T>(endpoint: string, token: string): Promise<T> => {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 204) { // No content, e.g. nothing playing
        return null as T;
    }

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
}

export const getUserProfile = (token: string): Promise<SpotifyUser> => {
    return callSpotifyApi<SpotifyUser>('/me', token);
}

export const getCurrentlyPlaying = (token: string): Promise<CurrentlyPlaying> => {
    return callSpotifyApi<CurrentlyPlaying>('/me/player/currently-playing', token);
}
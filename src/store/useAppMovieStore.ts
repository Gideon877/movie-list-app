import { persist } from "zustand/middleware";
import { create } from 'zustand';
import { Movie } from "../utils/interfaces";
import { getFavoriteMovies, addFavoriteMovie, removeFavoriteMovie } from "../api/movieApi";

interface AppState {
    favoriteMovies: Movie[];
    loading: boolean;
    error: string | null;
    fetchFavoriteMovies: (userId: string | null) => Promise<void>;
    addFavoriteMovieToStore: (userId: string, movie: Movie) => Promise<void>;
    removeFavoriteMovieFromStore: (movieId: string | number, userId: string) => Promise<void>;
    clearError: () => void;
}

export const useAppMovieStore = create<AppState>()(
    persist<AppState>(
        (set) => ({
            favoriteMovies: [],
            loading: false,
            error: null,
            fetchFavoriteMovies: async (userId: string | null) => {
                if (!userId) {
                    set({ error: 'User ID is required to fetch favorite movies.' });
                    return;
                }
                set({ loading: true, error: null });
                try {
                    const movies = await getFavoriteMovies(userId);
                    set({ favoriteMovies: movies });
                } catch (error) {
                    console.error('Error fetching favorite movies:', error);
                    set({ error: 'Failed to fetch favorite movies.' });
                } finally {
                    set({ loading: false });
                }
            },
            addFavoriteMovieToStore: async (userId: string, movie: Movie) => {
                set({ loading: true, error: null });
                try {
                    await addFavoriteMovie(userId, movie);
                    set((state) => ({
                        favoriteMovies: [...state.favoriteMovies, movie],
                    }));
                } catch (error) {
                    console.error('Error adding favorite movie:', error);
                    set({ error: 'Failed to add favorite movie.' });
                } finally {
                    set({ loading: false });
                }
            },
            removeFavoriteMovieFromStore: async (movieId: string | number, userId: string) => {
                set({ loading: true, error: null });
                try {
                    await removeFavoriteMovie(movieId, userId);
                    set((state) => ({
                        favoriteMovies: state.favoriteMovies.filter((movie) => movie.id !== movieId),
                    }));
                } catch (error) {
                    console.error('Error removing favorite movie:', error);
                    set({ error: 'Failed to remove favorite movie.' });
                } finally {
                    set({ loading: false });
                }
            },
            clearError: () => set({ error: null }),
        }),
        {
            name: 'app-movie-storage'
        }
    )
)
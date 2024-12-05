import { persist } from "zustand/middleware";
import { create } from 'zustand';
import { Movie } from "../utils/interfaces";


interface AppState {
    favoriteMovies: Movie[];
    addFavoriteMovie: (movie: Movie) => void;
    removeFavoriteMovie: (movieId: string | number) => void;
}

export const useAppMovieStore = create<AppState>()(
    persist<AppState>(
        (set) => ({
            favoriteMovies: [],
            addFavoriteMovie: (movie: Movie) => {
                set((state) => ({
                    favoriteMovies: [...state.favoriteMovies, movie],
                }));
            },
            removeFavoriteMovie: (movieId: string | number) => {
                set((state) => ({
                    favoriteMovies: state.favoriteMovies.filter((movie) => movie.id !== movieId),
                }));
            },
        }),
        {
            name: 'app-movie-storage'
        }
    )
)
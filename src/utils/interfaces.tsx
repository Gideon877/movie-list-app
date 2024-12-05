import { ReactNode } from "react";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number | null;

}

export interface FavoriteMovieState {
    userId: string;
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number | null;

}

export interface MovieSearchContentState {
    movies: Movie[];
    loading: boolean;
    error: string;
    searchQuery: string;
    modalOpen: boolean;
    selectedMovie: Movie | null;
    setSearchQuery: (query: string) => void;
    setMovies: (movies: Movie[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    setModalOpen: (open: boolean) => void;
    setSelectedMovie: (movie: Movie | null) => void;
}

export interface MovieStore {
    movies: Movie[];
    fetchMovies: () => Promise<void>;
}

export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    password: string | null;
    loading: boolean;
    error: string | null;
    setPassword: (password: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setAuthenticated: (status: boolean) => void;
    setUsername: (username: string | null) => void;

}

export interface SignUpAuthState {
    isAuthenticated: boolean;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    password: string | null;
    loading: boolean;
    error: string | null;
    setAuthenticated: (status: boolean) => void;
    setFirstName: (firstName: string | null) => void;
    setLastName: (lastName: string | null) => void;
    setUsername: (username: string | null) => void;
    setPassword: (password: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export interface AuthContextType {
    userId: string | null;
    authenticated: boolean;
    token: string | null;
    error: string | null;
    loading: boolean;
    setUserId: (id: string | null) => void;
    setAuthenticated: (status: boolean) => void;
    setToken: (token: string | null) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
    login: (id: string, token: string) => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface LoginStateProps {
    username: string | null;
    password: string | null;
    setPassword: (password: string) => void;
    setUsername: (username: string) => void;
}


export interface User {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    password: string | null;
}
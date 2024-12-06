import axios, { AxiosError } from 'axios';
import { Movie } from '../utils/interfaces';
import { useAuthStore } from '../store/useAuthStore';

const TMDB_API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_REACT_APP_TMDB_BASE_URL;

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/movies`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const getAuthHeaders = () => {
    const token = useAuthStore.getState().token; 
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const getFavoriteMovies = async (userId: string| null) => {
    try {
        const response = await api.get(`/favorite/${userId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        throw error;
    }
};

export const addFavoriteMovie = async (userId: string, movie: Movie) => {
    try {
        await api.post('/favorite', {
            userId,
            movie,
        }, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error('Error adding favorite movie:', error);
        throw error;
    }
};

export const removeFavoriteMovie = async (movieId: string| number, userId: string) => {
    try {
        await api.delete('/favorite', {
            data: {
                movieId,
                userId,
            },
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error('Error removing favorite movie:', error);
        throw error;
    }
};


export const searchMovies = async (query: string, setMovies: (movies: Movie[]) => void, setLoading: (loading: boolean) => void, setError: (error: string) => void) => {
    if (query.trim() === '') {
        setMovies([]);
        setError('');
        return;
    }

    setLoading(true);

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
                language: 'en-US',
                page: 1,
            },
        });

        setMovies(response.data.results);
        setError('');
    } catch (err) {
        const error = err as AxiosError;
        setError(error.response?.data?.status_message || 'Error fetching movies. Please try again.');
        setMovies([]);
    } finally {
        setLoading(false);
    }
};
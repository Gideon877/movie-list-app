import React, { ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Grid, Typography, CircularProgress, Container, Toolbar } from '@mui/material';
import { create } from 'zustand';
import { MovieSearchContentState, Movie } from '../../../utils/interfaces';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import NowPlayingMovies from '../NowPlayingMovies';

const TMDB_API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_REACT_APP_TMDB_BASE_URL;


const useStore = create<MovieSearchContentState>((set) => {
    const setMovies = (movies: Movie[]) => set({ movies });
    const setLoading = (loading: boolean) => set({ loading });
    const setError = (error: string) => set({ error });
    const setSearchQuery = (searchQuery: string) => set({ searchQuery });
    const setModalOpen = (modalOpen: boolean) => set({ modalOpen });
    const setSelectedMovie = (movie: Movie | null) => set({ selectedMovie: movie });


    return {
        movies: [],
        loading: false,
        error: '',
        modalOpen: false,
        searchQuery: '',
        selectedMovie: null,
        setMovies,
        setLoading,
        setError,
        setSearchQuery,
        setModalOpen,
        setSelectedMovie
    };
})

const MovieSearch: React.FC = () => {
    const {
        searchQuery,
        loading,
        error,
        movies,
        modalOpen,
        selectedMovie,
        setMovies,
        setLoading,
        setError,
        setSearchQuery,
        setModalOpen,
        setSelectedMovie
    } = useStore()

    const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
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
                    query: query,
                    language: 'en-US',
                    page: 1,
                    include_video: true
                },
            });

            setMovies(response.data.results);
            setError('');
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
            setError( 'Error fetching movies. Please try again.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Container>
                <TextField
                    label="Search for movies"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    margin="normal"
                    sx={{
                        width: `100%`,
                        display: 'flex', justifyContent: 'center', marginBottom: '20px'

                    }}
                />

                {loading && <CircularProgress />}

                {error && <Typography color="error">{error}</Typography>}

                <Grid container spacing={4} style={{ marginTop: '20px' }}>
                    {movies.length > 0 &&
                        movies.map((movie) => (
                            <Grid item xs={12} sm={6} md={3} key={movie.id}>
                                <MovieCard movie={movie} onInfoClick={() => handleOpenModal(movie)} />
                            </Grid>
                        ))}
                </Grid>
            </Container>



            <MovieModal open={modalOpen} movie={selectedMovie} onClose={handleCloseModal} />

            <Toolbar />
            <NowPlayingMovies />
        </div>
    );
};

export default MovieSearch;

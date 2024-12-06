import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import MovieCard from './search/MovieCard';
import { Movie } from '../../utils/interfaces';

const TMDB_API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

const NowPlayingMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
                    params: {
                        api_key: TMDB_API_KEY,
                        language: 'en-US',
                        page: 1,
                    },
                });
                setMovies(response.data.results);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
                setError('Failed to fetch movies');
                setLoading(false);
            }
        };

        fetchNowPlayingMovies();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Now Playing Movies
            </Typography>
            <Grid container spacing={4}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={3} key={movie.id}>
                        <MovieCard onInfoClick={()=> null} movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default NowPlayingMovies;

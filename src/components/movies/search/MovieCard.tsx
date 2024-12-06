import React from 'react'
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Movie } from '../../../utils/interfaces';
import { InfoOutlined, FavoriteOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../../store/useAuthStore';
import { addFavoriteMovie } from '../../../api/movieApi';
import { useAppMovieStore } from '../../../store/useAppMovieStore';
import _ from 'lodash';


//TODO: Add SnackBar when you add a movie to favorites

interface MovieCardProps {
    movie: Movie;
    onInfoClick: () => void;

}
const MovieCard: React.FC<MovieCardProps> = ({ movie, onInfoClick }) => {
    const { userId, setLoading } = useAuthStore();
    const { fetchFavoriteMovies, favoriteMovies } = useAppMovieStore()

    const isFavorite = _.some(favoriteMovies, (favMovie) => favMovie.id === movie.id)
    return (
        <Card>
            {movie.poster_path ? (
                <CardMedia
                    component="img"
                    height="350"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            ) : (
                <div style={{ height: 350, backgroundColor: '#f0f0f0' }}>
                    {/* Placeholder if no poster is available */}
                    <Typography variant="h6" align="center" style={{ paddingTop: '150px' }}>
                        No Image Available
                    </Typography>
                </div>
            )}
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {movie.title.length > 17 ? movie.title.substring(0, 17) + '...' : movie.title}
                </Typography>
                {movie.overview ? (
                    <Typography variant="body2" color="textSecondary">
                        {movie.overview.length > 45 ? movie.overview.substring(0, 45) + '...' : movie.overview}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="error">
                        No overview available
                    </Typography>
                )}
                <Rating name="read-only" value={movie?.vote_average / 10 * 5} readOnly />

                <br />
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ButtonGroup
                        sx={{
                            display: 'flex',
                            justifyContent: `${onInfoClick !== undefined ? 'center' : ''}`,
                            width: '100%',
                        }}
                    >
                        {onInfoClick && <Button
                            onClick={onInfoClick}
                            startIcon={<InfoOutlined color="primary" />}
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Typography variant="body2">Info</Typography>
                        </Button>}
                        <Button
                            disabled={isFavorite}
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    if (userId) {
                                        await addFavoriteMovie(userId, movie);
                                        await fetchFavoriteMovies(userId)
                                        setLoading(false);
                                    }
                                } catch (error) {
                                    console.error('Failed to add movie', error);
                                    setLoading(false);
                                }
                            }}
                            startIcon={<FavoriteOutlined color={!isFavorite ? 'error' : 'inherit'} />}
                            variant="outlined"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Typography variant="body2">Favorites</Typography>
                        </Button>
                    </ButtonGroup>
                </Box>

                <br />
            </CardContent>
        </Card>
    )
}

export default MovieCard

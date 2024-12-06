import React, { Fragment } from 'react'
import { Alert, AlertColor, Box, Button, ButtonGroup, Card, CardContent, CardMedia, Rating, Snackbar, Typography } from '@mui/material';
import { Movie } from '../../../utils/interfaces';
import { InfoOutlined, FavoriteOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../../store/useAuthStore';
import { removeFavoriteMovie } from '../../../api/movieApi';
import { create } from 'zustand';
import { useAppMovieStore } from '../../../store/useAppMovieStore';


interface MovieCardProps {
    movie: Movie;
    onInfoClick: () => void;
    onRemoveClick: (movieId: string | number) => void;
}

interface MovieCardStore {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: AlertColor;
    setSnackbarOpen: (snackbarOpen: boolean) => void;
    setSnackbarMessage: (snackbarMessage: string) => void;
    setSnackbarSeverity: (snackbarSeverity: AlertColor) => void;

}

const useFavoriteCardStore = create<MovieCardStore>((set) => ({
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'info',
    setSnackbarOpen: (snackbarOpen: boolean) => set({ snackbarOpen }),
    setSnackbarMessage: (snackbarMessage: string) => set({ snackbarMessage }),
    setSnackbarSeverity: (snackbarSeverity: AlertColor) => set({ snackbarSeverity })
}))

const FavoriteMoviesCard: React.FC<MovieCardProps> = ({ movie, onInfoClick, onRemoveClick }) => {
    const { userId, loading, setLoading } = useAuthStore();
    const {
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        setSnackbarMessage,
        setSnackbarSeverity,
        setSnackbarOpen
    } = useFavoriteCardStore()
    const { fetchFavoriteMovies} = useAppMovieStore()

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (

        <Fragment>
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
                    {movie.vote_average && <Rating name="read-only" value={movie.vote_average / 10 * 5} readOnly />}

                    <br />
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <ButtonGroup
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Button
                                onClick={onInfoClick}
                                startIcon={<InfoOutlined color="primary" />}
                                variant="outlined"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Typography variant="body2">Info</Typography>
                            </Button>
                            <Button
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true);
                                    const title = movie.title;
                                    try {
                                        if (userId) {
                                            await removeFavoriteMovie(movie.id, userId);
                                            await fetchFavoriteMovies(userId)
                                            onRemoveClick(movie.id)
                                            setLoading(false);
                                            setSnackbarMessage(`${title} has been removed successfully!`);
                                            setSnackbarSeverity('success');
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove movie', error);
                                        setLoading(false);
                                        setSnackbarMessage(`Error occurred. Failed to remove ${title}!`);
                                        setSnackbarSeverity('error');
                                    }
                                    finally {
                                        setLoading(false);
                                        setSnackbarOpen(true);
                                    }
                                }}
                                startIcon={<FavoriteOutlined color="error" />}
                                variant="outlined"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Typography variant="body2">Remove</Typography>
                            </Button>
                        </ButtonGroup>
                    </Box>

                </CardContent>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default FavoriteMoviesCard
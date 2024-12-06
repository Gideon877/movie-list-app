import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Rating } from '@mui/material';
import { Movie } from '../../../utils/interfaces';
import moment from 'moment';

interface MovieModalProps {
    open: boolean;
    movie: Movie | null;
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ open, movie, onClose }) => {
    if (!movie) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Movie Details</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="row" gap={2}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '200px', borderRadius: '8px' }}
                    />
                    <Box>
                        <Typography variant="h6">{movie.title}</Typography>
                        {movie.createdAt && (
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Added: {moment(movie.createdAt).fromNow()}</Typography>
                        )}
                        <Typography variant="body1" color="textSecondary" style={{ margin: '10px 0' }}>
                            {movie.overview || 'No overview available'}
                        </Typography>
                        {movie.release_date && (
                            <Typography variant="body2">Release Date: {movie.release_date}</Typography>
                        )}
                        {movie.vote_average !== undefined && (
                            <>
                                <Typography variant="body2">Rating: {movie.vote_average}</Typography>
                                <Rating name="read-only" value={movie.vote_average / 10 * 5} readOnly />
                            </>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MovieModal;

import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { create } from 'zustand';
import { getFavoriteMovies } from '../../../api/movieApi';
import { useAuthStore } from '../../../store/useAuthStore';
import { FavoriteMovieState } from '../../../utils/interfaces'
import FavoriteMoviesCard from '../favorite/FavoriteMoviesCard';
import MovieModal from '../search/MovieModal';

interface FavoriteMoviesStore {
	favoriteMovies: FavoriteMovieState[] | null;
	modalOpen: boolean;
	selectedMovie: FavoriteMovieState | null;

	setFavoriteMovies: (movies: FavoriteMovieState[]) => void;
	setSelectedMovie: (movies: FavoriteMovieState | null) => void;
	setModalOpen: (modalOpen: boolean) => void;
	removeFavoriteMovie: (movieId: string) => void;

}

const useFavoriteMoviesStore = create<FavoriteMoviesStore>((set) => ({
	favoriteMovies: [],
	modalOpen: false,
	selectedMovie: null,
	setModalOpen: (modalOpen: boolean) => set({ modalOpen }),
	setFavoriteMovies: (movies: FavoriteMovieState[]) => set({ favoriteMovies: movies }),
	setSelectedMovie: (movie: FavoriteMovieState | null) => set({ selectedMovie: movie }),
	removeFavoriteMovie: (movieId: string | number) => {
		set((state) => ({
			favoriteMovies: state.favoriteMovies?.filter((movie) => movie.id !== movieId) || null,
		}));
	},
}));

const FavoriteMovies: React.FC = () => {

	const { userId } = useAuthStore();
	const {
		favoriteMovies,
		modalOpen,
		selectedMovie,
		setFavoriteMovies,
		setModalOpen,
		setSelectedMovie,
		removeFavoriteMovie
	} = useFavoriteMoviesStore();


	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			try {
				const movies = await getFavoriteMovies(userId);
				console.log(movies)
				setFavoriteMovies(movies);
			} catch (error) {
				console.error('Failed to fetch favorite movies', error);
			}
		};

		fetchFavoriteMovies();
	}, [userId, setFavoriteMovies]);


	const handleOpenModal = (movie: FavoriteMovieState) => {
		setSelectedMovie(movie);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedMovie(null);
	};

	const handleRemoveMovie = (movieId: string | number) => {
		removeFavoriteMovie(movieId);
	};

	return (
		<div style={{ padding: '20px' }}>
			<Container>
				<h1>Favorite Movies</h1>

				<Grid container spacing={4} style={{ marginTop: '20px' }}>
					{favoriteMovies && favoriteMovies.map((movie: FavoriteMovieState) => (
						<Grid item xs={12} sm={6} md={3} key={movie.id}>
							<FavoriteMoviesCard onRemoveClick={() => handleRemoveMovie(movie.id)} movie={movie} onInfoClick={() => handleOpenModal(movie)} />
						</Grid>
					))}
				</Grid>
				<MovieModal open={modalOpen} movie={selectedMovie} onClose={handleCloseModal} />


			</Container>
		</div>
	)
}

export default FavoriteMovies
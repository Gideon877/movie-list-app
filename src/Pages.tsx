import { Box, Toolbar } from "@mui/material";
import React from "react";
import { useAppStore } from "./store/useAppStore";
import Profile from "./components/Profile";
import FavoriteMovies from "./components/movies/favorite/FavoriteMovies";
import MovieSearch from "./components/movies/search/MovieSearch";


const Pages: React.FC = () => {
    const { activeView } = useAppStore()

    return (
        <Box component='main'>
            <Toolbar />
            {activeView === 'Home' && <MovieSearch />}
            {activeView === 'Favorites' && <FavoriteMovies />}
            {activeView === 'Profile' && <Profile />}
        </Box>
    )

}

export default Pages;
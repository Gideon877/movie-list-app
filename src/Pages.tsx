import { Box, Toolbar } from "@mui/material";
import React from "react";
import { useAppStore } from "./store/useAppStore";
import Profile from "./components/Profile";
import FavoriteMovies from "./components/movies/favorite/FavoriteMovies";
import MovieSearch from "./components/movies/search/MovieSearch";


interface PagesProps { 
    drawerWidth: number 
}

const Pages: React.FC <PagesProps> = ({drawerWidth }) => {

    const { activeView } = useAppStore()

    console.log({drawerWidth});

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
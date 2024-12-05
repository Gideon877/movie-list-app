import React from "react";
import MovieSearch from "./movies/search/MovieSearch";
import Pages from "../Pages";
import { CssBaseline } from "@mui/material";

const drawerWidth = 240;

const Home: React.FC = () => {

    

    return (
        <>
            <CssBaseline />

            <Pages drawerWidth={drawerWidth} />
        </>
    )
}

export default Home;
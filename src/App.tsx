import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import NotFound from './components/NotFound';
import { useAuthStore } from './store/useAuthStore';
import Profile from './components/Profile';
import Auth from './components/auth/Auth';


const App: React.FC = () => {
	const { authenticated, verifyToken, logout } = useAuthStore();

    useEffect(() => {
        if (!verifyToken()) {
            logout();
            // alert('Session expired. Please log in again.');
        }
    }, [logout, verifyToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={!authenticated ? <Auth /> : <Navigate to="/" />} />
				{/* <Route path="/login" element={!authenticated ? <Login /> : <Navigate to="/" />} />
				<Route path="/signup" element={!authenticated ? <SignUp /> : <Navigate to="/" />} /> */}
				<Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
				<Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
				<Route path="*" element={<NotFound />} />

			</Routes>
		</Router>
	)
}

export default App

import { useState } from 'react';
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
import Home from './components/Home';

const App = () => {
	const { userId, authenticated } = useAuthStore();

	console.log({userId, authenticated});

	return (
		<Router>
			<Routes>
				<Route path="/login" element={!authenticated ? <Login /> : <Navigate to="/" />} />
				<Route path="/signup" element={!authenticated ? <SignUp /> : <Navigate to="/" />} />
				<Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
				{/* <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} /> */}
				<Route path="*" element={<NotFound />} />

			</Routes>
		</Router>
	)
}

export default App

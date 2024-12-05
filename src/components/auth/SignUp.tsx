import React from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert, ButtonGroup, Link } from '@mui/material';
import { SignUpAuthState } from "../../utils/interfaces";
import { create } from 'zustand';
import { ExitToApp } from '@mui/icons-material';


const useAuthStore = create<SignUpAuthState>((set) => ({
    isAuthenticated: false,
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    loading: false,
    error: null,
    setAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
    setFirstName: (firstName: string | null) => set({ firstName }),
    setLastName: (lastName: string | null) => set({ lastName }),
    setUsername: (username: string | null) => set({ username }),
    setPassword: (password: string | null) => set({ password }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
}));

const SignUp: React.FC = () => {
    const {
        setFirstName,
        setLastName,
        setUsername,
        setPassword,
        setLoading,
        setError,
        isAuthenticated,
        loading,
        error,
        firstName,
        lastName,
        username,
        password
    } = useAuthStore();

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);

        // Simulate an API call for sign-up (replace with actual API call logic)
        setTimeout(() => {
            if (username && password && firstName && lastName) {
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setPassword(password);
                setLoading(false);
                setError(null);
                alert('Sign-up successful!');
            } else {
                setLoading(false);
                setError('All fields are required.');
            }
        }, 1000);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />

                <Box>
                    <ButtonGroup
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSignUp}
                            startIcon={<ExitToApp />}
                            sx={{ marginTop: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                    </ButtonGroup>
                </Box>

                <br />
                <Link href="/login" variant="body2">
                    Already have an account? Log In
                </Link>
            </Box>
        </Container>
    );
};

export default SignUp;

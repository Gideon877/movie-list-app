import React from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert, ButtonGroup, Link } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSignUpStore } from '../../store/useAppStore';
import { signupApi } from '../../api/authApi';
import CustomSnackbar from '../CustomSnackbar';


const SignUp: React.FC = () => {
    const {
        setFirstName,
        setLastName,
        setUsername,
        setPassword,
        setLoading,
        setError,
        setType,
        setOpen,
        open, 
        type, 
        loading,
        error,
        firstName,
        lastName,
        username,
        password
    } = useSignUpStore();
    const showSnackbar = (message: string, type: 'success' | 'error' | 'info') => {
        console.log('showSnackbar called with message:', message, 'and type:', type);

        setError(message);
        setType(type);
        setOpen(true);
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        setTimeout(async () => {
            if (username && password && firstName && lastName) {
                await signupApi({
                    firstName,
                    lastName,
                    username,
                    password
                })
                    .then(() => {
                        showSnackbar('Sign-up successful!', 'success');
                    }).catch((error) => {
                        console.log(error);
                        showSnackbar('An error occurred while signing up. Please try again.', 'error');
                    }).finally(() => {
                        setLoading(false);
                    })

                alert('Sign-up successful!');
            } else {
                setLoading(false);
                showSnackbar('All fields are required.', 'error');
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
            <CustomSnackbar open={open} message={error} type={type as "info" | "error" | "success"} onClose={() => setOpen(false)} />

        </Container>
    );
};

export default SignUp;

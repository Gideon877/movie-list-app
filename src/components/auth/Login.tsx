import React from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert, ButtonGroup, Grid2, Link } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../store/useAuthStore';
import { loginApi } from '../../api/authApi';
import { useAppStore, useLoginStore } from '../../store/useAppStore';


const Login: React.FC = () => {
    const {
        error,
        loading,
        login,
        setLoading,
        setError,
    } = useAuthStore();

    const {setActiveView } = useAppStore()

    const { username, password, setPassword, setUsername } = useLoginStore();

    const handleLogin =  () => {
        setLoading(true);
        setError(null);
        setTimeout(async () => {
            await loginApi({username, password})
            .then((response) => { 
                const {userId, token} = response;
                login(userId, token);
                setActiveView('Home');
                setPassword('');
                setUsername('');
            })
            .catch((error) => { 
                console.log(error)
                setLoading(false);
                setError('Invalid username or password');
            })
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
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}

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
                            onClick={handleLogin}
                            startIcon={<LoginOutlined />}
                            sx={{ marginTop: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>

                    </ButtonGroup>
                </Box>

                <br />
                <Grid2 container>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid2>
            </Box>
        </Container>
    );
};

export default Login;
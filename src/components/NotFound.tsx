import React from 'react';
import { Link, Typography, Box, Button } from '@mui/material';

const NotFound = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				textAlign: 'center',
				padding: 2,
			}}
		>
			<Typography variant="h3" color="primary" gutterBottom>
				Welcome!
			</Typography>
			<Typography variant="body1" color="textSecondary" paragraph>
				Sorry, the page you're looking for doesn't exist.
			</Typography>
			<Typography variant="body1" color="textSecondary" paragraph>
				Please sign in or sign up to access the content.
			</Typography>
			<Box>
				<Button
					component={Link}
					href="/login"
					variant="contained"
					color="primary"
					sx={{ marginRight: 2 }}
				>
					Sign In
				</Button>
				<Typography variant="body1" display="inline" sx={{ marginRight: 2 }}>
					or
				</Typography>
				<Button
					component={Link}
					href="/signup"
					variant="outlined"
					color="primary"
				>
					Sign Up
				</Button>
			</Box>
		</Box>
	);
};

export default NotFound;

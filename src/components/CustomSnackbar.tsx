// src/components/CustomSnackbar.tsx
import React from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';

interface CustomSnackbarProps {
	open: boolean;
	message: string | null;
	type: 'success' | 'error' | 'info';
	onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, type, onClose }) => {
	let severity: AlertProps['severity'];

	switch (type) {
		case 'success':
			severity = 'success';
			break;
		case 'error':
			severity = 'error';
			break;
		case 'info':
			severity = 'info';
			break;
		default:
			severity = 'info';
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			sx={{ width: '400px' }}
		>
			<Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;

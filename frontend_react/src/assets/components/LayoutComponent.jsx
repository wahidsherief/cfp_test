import React from 'react';
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSnackbar } from '../contexts/SnackbarProvider';
import { useAlert } from '../contexts/AlertProvider';

export const LayoutComponent = () => {
    const { closeSnackbar, snackbarOpen, snackbarMessage, snackbarSeverity } = useSnackbar()
    const { errors } = useAlert();

    return (
        <>
            <AppBar position="static" sx={{ boxShadow: 'none', bgcolor: 'transparent', marginBottom: 10 }}>
                <Toolbar>
                    <Box sx={{ mr: "auto" }}>
                        <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
                            CFP ENERGY TEST
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', ml: 'auto' }}>
                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                            color="success"
                            startIcon={<HomeIcon />}
                            sx={{ mr: 2 }}  // Add margin to the right of the Home button
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/create"
                            variant="outlined"
                            startIcon={<AddOutlinedIcon />}
                            color="primary"
                        >
                            Add User
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {Object.keys(errors).length > 0 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 4
                }}>
                    <Alert severity="error" sx={{
                        width: { xs: '100%', sm: '50%' },
                        textAlign: 'left',
                    }}>
                        <ul>
                            {Object.keys(errors).map(field => (
                                <li key={field}>{errors[field].join(', ')}</li>
                            ))}
                        </ul>
                    </Alert>
                </Box>
            )}

            <Outlet />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

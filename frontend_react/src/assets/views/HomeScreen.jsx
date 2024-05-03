import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import { useFormContext } from '../contexts/FormProvider';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const TableHeader = () => {
    return (
        <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>NID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
};

const TableRowData = ({ row, handleDelete }) => {

    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();
    const { setForm } = useFormContext();

    const handleEdit = (rowData) => {
        setForm(rowData);
        navigate('/update');
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleDeleteConfirm = () => {
        handleDelete(row.id);
        handleCloseDialog();
    }

    return (
        <>
            <TableRow>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.date_of_birth}</TableCell>
                <TableCell>{row.nid}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>*******</TableCell>
                <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleOpenDialog}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography variant="h6">Delete Record</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this record?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseDialog} sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'darkgray' } }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const Home = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                console.log(response.data);
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('Error fetching data');
                setSnackbarOpen(true);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when data fetching is done
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(response => {
                // Handle deletion success
                console.log('Record deleted successfully');
                setSnackbarSeverity('success');
                setSnackbarMessage('Record deleted successfully');
                setSnackbarOpen(true);
                fetchData(); // Fetch data again after deletion
            })
            .catch(error => {
                console.error('Error deleting data:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('Error deleting record');
                setSnackbarOpen(true);
            });
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    return (
        <>
            {loading ? ( // Show CircularProgress if loading
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    {rows.length === 0 ? (
                        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography variant="body1">No user found</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" startIcon={<AddOutlinedIcon />} color="primary" onClick={() => navigate('/form')}>
                                    Add User
                                </Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHeader />
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRowData key={row.id} row={row} handleDelete={handleDelete} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};
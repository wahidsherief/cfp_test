import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { useFormContext } from '../contexts/FormProvider';
import { useNavigate } from 'react-router-dom';

const FormField = ({ label, name, type, value, onChange }) => {
    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};

export const UpdateForm = () => {
    const { formData, setForm } = useFormContext();
    const navigate = useNavigate();
    const [values, setValues] = useState({ formData });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        setValues(formData);
    }, [formData]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = (e) => {
        console.log('va', values)
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${formData.id}`, values)
            .then(response => {
                setForm(null); // Clear form context
                setSnackbarSeverity('success');
                setSnackbarMessage('Data updated successfully');
                setSnackbarOpen(true);
                navigate('/');
            })
            .catch(error => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Error updating data');
                setSnackbarOpen(true);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <form onSubmit={handleUpdate}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormField label="First Name" name="first_name" type="text" value={values.first_name || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Last Name" name="last_name" type="text" value={values.last_name || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Email" name="email" type="email" value={values.email || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Mobile" name="mobile" type="tel" value={values.mobile || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Date of Birth" name="date_of_birth" type="date" value={values.date_of_birth || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="NID" name="nid" type="number" value={values.nid || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Username" name="username" type="text" value={values.username || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormField label="Password" name="password" type="password" value={values.password || ''} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update
                </Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

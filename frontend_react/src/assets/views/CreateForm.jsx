import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { useFormContext } from '../contexts/FormProvider';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarProvider';

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

export const CreateForm = () => {
    const { setForm } = useFormContext();
    const navigate = useNavigate();
    const initialFormValues = {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        date_of_birth: '',
        nid: '',
        username: '',
        password: '',
    };

    const { openSnackbar } = useSnackbar();
    const [values, setValues] = useState(initialFormValues);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users', values)
            .then(response => {
                setForm(initialFormValues)
                openSnackbar('Data inserted successfully', 'success');
                navigate('/');
            })
            .catch(error => {
                openSnackbar('Error creating data', 'error');
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormField label="First Name" name="first_name" type="text" value={values.first_name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Last Name" name="last_name" type="text" value={values.last_name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Mobile" name="mobile" type="tel" value={values.mobile} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Date of Birth" name="date_of_birth" type="date" value={values.date_of_birth} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="NID" name="nid" type="number" value={values.nid} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Username" name="username" type="text" value={values.username} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
            </Button>
        </form>
    );
}

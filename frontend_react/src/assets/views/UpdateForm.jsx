import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useFormContext } from '../contexts/FormProvider';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarProvider';
import { useAlert } from '../contexts/AlertProvider';
import { AxiosInstance } from '../../config';

const today = new Date().toISOString().split('T')[0];

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
            disabled={type === "disable"}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                max: today, // Set max attribute to today's date
            }}
        />
    );
};

export const UpdateForm = () => {
    const { formData, setForm } = useFormContext();
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const { setErrors } = useAlert();
    const [values, setValues] = useState({ ...formData });

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
        e.preventDefault();
        AxiosInstance.put(`/users/${formData.id}`, values)
            .then(response => {
                setForm(null)
                setErrors({});
                openSnackbar('Data updated successfully', 'success')
                navigate('/')
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
                openSnackbar('Error updating data', 'error')
            });
    };

    return (
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
                    <FormField label="Password" name="password" type="disable" value={'*****'} onChange={handleChange} />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Update
            </Button>
        </form>
    );
};

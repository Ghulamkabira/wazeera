import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup'; 
import { useFormik } from 'formik';

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    age: Yup.number().positive('Age must be a positive number').max(100, 'Age cannot be more than 100').required('Age is required'),
    session: Yup.string().required('Session is required'),
    grade: Yup.string().required('Grade is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      session: '',
      grade: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newStudent = {
        ...values,
      };

      axios.post('http://localhost:8000/api/items/', newStudent)
        .then((response) => {
          setStudents([...students, response.data]);
          setSuccessMessage('Student added successfully!'); // Set success message
          clearForm();
        })
        .catch((error) => {
          console.error('Error adding student:', error);
          setErrorMessage('Error adding student. Please try again.');
          setSnackbarErrorOpen(true);
        });
    },
  });

  const clearForm = () => {
    formik.resetForm();
  };

  const handleSnackbarClose = () => {
    setSnackbarErrorOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        marginLeft: { xs: 10, md: 28 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          width: { xs: '90%', sm: '500px' },
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#1e88e5' }}>
          Add Students
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <TextField
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            sx={{
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <TextField
            label="Session"
            variant="outlined"
            fullWidth
            name="session"
            value={formik.values.session}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.session && Boolean(formik.errors.session)}
            helperText={formik.touched.session && formik.errors.session}
            sx={{
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <TextField
            label="Grade"
            variant="outlined"
            fullWidth
            name="grade"
            value={formik.values.grade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.grade && Boolean(formik.errors.grade)}
            helperText={formik.touched.grade && formik.errors.grade}
            sx={{
              marginBottom: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              '& fieldset': {
                borderColor: '#90caf9',
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            color="success"
          >
            Add Student
          </Button>
        </form>

        {/* Display success message directly */}
        {successMessage && (
          <Typography variant="body1" color="success.main" sx={{ marginTop: '20px' }}>
            {successMessage}
          </Typography>
        )}

        {/* Snackbar for error messages */}
        <Snackbar
          open={snackbarErrorOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ backgroundColor: '#f44336' }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AddStudent;

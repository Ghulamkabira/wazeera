import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; // Make sure axios is imported

// Define a light theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Light background color for the entire app
    },
    primary: {
      main: '#1976d2', // Main primary color for buttons
    },
    text: {
      primary: '#333', // Dark text color for contrast
    },
  },
});

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Student Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  class: Yup.string().required('Class is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  address: Yup.string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters long'),
});

const NewAdmission = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarErrorOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        student_name: values.name,
        email: values.email,
        class_name: values.class,
        date_of_birth: values.dateOfBirth,
        address: values.address,
      };

      // Send the data to the backend
      const response = await axios.post('http://localhost:8000/api/students/', payload);

      console.log('Form submitted successfully:', response.data);

      // Set the success message and clear it after some time
      setSuccessMessage('Admission submitted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit admission. Please try again.');
      setSnackbarErrorOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 4,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: { xs: 10, md: 25 },
          justifyContent: 'center',
          backgroundColor: '#f5f5f5', // Light background color for the container
          minHeight: '100vh', // Full height for the background
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 600, bgcolor: 'white', boxShadow: 3 }}>
          <CardHeader
            title="New Admission"
            sx={{ bgcolor: '#e3f2fd', textAlign: 'center' }} // Light blue header
          />
          <CardContent>
            <Formik
              initialValues={{
                name: '',
                email: '',
                class: '',
                dateOfBirth: '',
                address: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Student Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Class"
                    name="class"
                    value={values.class}
                    onChange={handleChange}
                    error={touched.class && Boolean(errors.class)}
                    helperText={touched.class && errors.class}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    required
                  />
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Admission'}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>

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
            <Typography variant="body1" color="error" >
              {errorMessage}
            </Typography>
            </Snackbar>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default NewAdmission;

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [successMessage, setSuccessMessage] = useState(''); // State to manage success message
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      username,
      email,
      password,
    };

    try {
      const senddata = await axios.post('http://localhost:8000/api/signup/', payload);
      
      if (senddata.status === 201) {
        setSuccessMessage('Sign up successful! Redirecting to login page...');
        setTimeout(() => {
          navigate("/login"); // Redirect after a delay
        }, 2000); // 2-second delay before redirecting
      }
    } catch (error) {
      setErrorMessage('Sign up failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  const handleGoogleLoginSuccess = async (response) => {
    // You can send the Google token to the backend for authentication
    const { credential } = response;
    console.log('clcikes')
    try {
      const senddata = await axios.post('http://localhost:8000/auth/social/google/', { token: credential });
      
      if (senddata.status === 201) {
        setSuccessMessage('Google sign-up successful! Redirecting to login page...');
        setTimeout(() => {
          navigate("/login"); // Redirect after a delay
        }, 2000); 
      }
    } catch (error) {
      setErrorMessage('Google sign-up failed. Please try again.');
    }
  };

  const handleGoogleLoginError = () => {
    setErrorMessage('Google login failed.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        marginLeft: { xs: 10, md: 78 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Signup
        </Typography>

        {/* Success Message */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {/* Error Message */}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
          <Button sx={{mt:2}}
          onClick={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          buttonText="Sign Up with Google"
        >google</Button>

        </form>
        
        {/* Google Sign-Up Button */}
      
        <Typography sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login">
            <Button variant="text" color="primary">
              Login
            </Button>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;

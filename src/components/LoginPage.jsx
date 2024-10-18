import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      const senddata = await axios.post('http://localhost:8000/api/login/', payload);
      if (senddata.status === 200) {
        const token = senddata.data.access;
        localStorage.setItem('accessTokens', token);
        
      
        onLogin(); 

        // Navigate to the dashboard after successful login
        navigate("/");
      }
    } catch (error) {
      alert('Invalid login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const senddata = await axios.post('http://localhost:8000/api/google-login/', { token: credential });
      if (senddata.status === 200) {
        const token = senddata.data.access;
        localStorage.setItem('accessTokens', token);
        
        // Call the onLogin function to update the authentication state
        onLogin();

        // Navigate to the dashboard after successful Google login
        navigate("/");
      }
    } catch (error) {
      alert('Google login failed. Please try again.');
    }
  };

  const handleGoogleLoginError = () => {
    alert('Google login failed.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        paddingTop: '80px',
        marginLeft: { xs: 10, md: 70 },
        paddingX: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, md: 5 },
          width: { xs: '90%', sm: '400px' },
          textAlign: 'center',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#00695c' }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', mb: 3 }}>
          Please login to your account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#009688',
                },
                '&:hover fieldset': {
                  borderColor: '#00796b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#004d40',
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#009688',
                },
                '&:hover fieldset': {
                  borderColor: '#00796b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#004d40',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#009688',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00796b',
              },
              borderRadius: '8px',
              fontSize: { xs: '14px', md: '16px' },
              padding: '10px',
            }}
          >
            Login
          </Button>
        </Box>

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#db4437',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#c23321',
                },
                borderRadius: '8px',
                mt: 2,
              }}
            >
              Login with Google
            </Button>
          )}
        />

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/signup">
            <Button variant="text" color="primary">
              Sign Up
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

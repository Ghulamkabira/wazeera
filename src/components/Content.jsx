import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const Content = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Welcome to the Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Button variant="contained" href="/loginPage">Login</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" href="/signup">Signup</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" href="/studentdetail">Student Details</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function GradesReports() {
  return (
    <Box 
      sx={{
        py: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: '100vw',
        marginLeft: { xs: 5, md: 20 },
        overflowX: 'hidden',
  
      }}
    >
      <Card 
        sx={{ 
          width: '95%', // Increased width of the card
          marginBottom: 2, 
          textAlign: 'center',
          backgroundColor: '#e3f2fd', // Light blue color for the card background
        //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slight shadow for better visual effect
        }}
      >
        <CardHeader title="Grades Reports" />
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Here you can view and manage the grades of your students.
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#ffffff' }}>
            <Table aria-label="grades table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#bbdefb' }}> {/* Light blue color for table header */}
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Percentage Range</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>GPA Scale</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: '#f0f4f8' }}> {/* Alternating row color */}
                  <TableCell align="center">A</TableCell>
                  <TableCell align="center">90% - 100%</TableCell>
                  <TableCell align="center">4.0</TableCell>
                  <TableCell align="center">Excellent</TableCell>
                  <TableCell align="center">Outstanding performance</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">B</TableCell>
                  <TableCell align="center">80% - 89%</TableCell>
                  <TableCell align="center">3.0</TableCell>
                  <TableCell align="center">Good</TableCell>
                  <TableCell align="center">Above average understanding</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f0f4f8' }}> {/* Alternating row color */}
                  <TableCell align="center">C</TableCell>
                  <TableCell align="center">70% - 79%</TableCell>
                  <TableCell align="center">2.0</TableCell>
                  <TableCell align="center">Average</TableCell>
                  <TableCell align="center">Satisfactory, meets requirements</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">D</TableCell>
                  <TableCell align="center">60% - 69%</TableCell>
                  <TableCell align="center">1.0</TableCell>
                  <TableCell align="center">Below Average</TableCell>
                  <TableCell align="center">Needs improvement</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f0f4f8' }}> {/* Alternating row color */}
                  <TableCell align="center">F</TableCell>
                  <TableCell align="center">Below 60%</TableCell>
                  <TableCell align="center">0.5</TableCell>
                  <TableCell align="center">Fail</TableCell>
                  <TableCell align="center">Unsatisfactory performance</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f0f4f8' }}> {/* Alternating row color */}
                  <TableCell align="center">G</TableCell>
                  <TableCell align="center">Below 50%</TableCell>
                  <TableCell align="center">0.0</TableCell>
                  <TableCell align="center">Fail</TableCell>
                  <TableCell align="center">poor performance</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default GradesReports;

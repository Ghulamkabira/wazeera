// AttendanceReports.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';

const attendanceData = [
  { id: 1, className: 'Class 1', totalStudents: 30, presentStudents: 28, date: '2024-10-04' },
  { id: 2, className: 'Class 2', totalStudents: 25, presentStudents: 23, date: '2024-10-04' },
  { id: 3, className: 'Class 3', totalStudents: 31,  presentStudents:28, date: '2024-10-04' },
  { id: 4, className: 'Class 4', totalStudents: 27, presentStudents: 25, date: '2024-10-04' },
  { id: 5, className: 'Class 5', totalStudents: 32, presentStudents: 31, date: '2024-10-04' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'className', headerName: 'Class Name', width: 150 },
  { field: 'totalStudents', headerName: 'Total Students', width: 150 },
  { field: 'presentStudents', headerName: 'Present Students', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
];

const AttendanceReports = () => {
  return (
<Box
  sx={{
    p: 4,
    textAlign: 'center',
    marginLeft: { xs: 2, md: 15 },
    marginRight: { xs: 2, md: 10 },
    marginTop: 5,
  }}
>
  <Card
    sx={{
      backgroundColor: '#fff', 
      borderRadius: '16px', // Larger border radius for smoother corners
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Slightly heavier shadow for a more prominent card
    }}
  >
    <CardHeader
      title="Attendance Reports"
      sx={{
        backgroundColor: '#4fc3f7', // Brighter teal-blue background for header
        color: '#fff', // White text for better contrast
        textAlign: 'center',
        padding: '16px',
        fontSize: '1.25rem',
        borderRadius: '16px 16px 0 0', // Rounded top corners to match card
      }}
    />
    <CardContent>
      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
        sx={{
          marginBottom: 2,
          fontSize: '1rem', // Slightly larger text for better readability
          color: '#616161', // Softer grey for body text
        }}
      >
        Below is the attendance report for different classes.
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={attendanceData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            '& .MuiDataGrid-root': {
              backgroundColor: '#fafafa', // Light neutral background for the grid
              borderRadius: '8px', // Slight border radius for the grid
            },
            '& .MuiDataGrid-cell': {
              color: '#37474f', // Dark grey text for the grid cells
              fontSize: '0.95rem', // Slightly larger text for better readability
              padding: '8px', // Additional padding for grid cells
            },
            '& .MuiDataGrid-columnHeaders': {
            
              fontWeight: 'bold',
            //   fontSize: '1rem',
            //   padding: '8px', // Padding for header cells
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0f7fa', // Subtle footer background
              color: '#00695c', // Matching footer text color
            },
          }}
        />
      </div>
    </CardContent>
  </Card>
</Box>

  );
};

export default AttendanceReports;

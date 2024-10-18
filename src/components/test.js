import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const rows = [
  { id: 1, name: 'John Doe', age: 20, email: 'john@example.com', session: '2024', grade: 'A' },
  { id: 2, name: 'Jane Smith', age: 22, email: 'jane@example.com', session: '2024', grade: 'B'},
  { id: 3, name: 'Alice Johnson', age: 23, email: 'alice@example.com', session: '2024', grade: 'C'},
  { id: 4, name: 'Bob Brown', age: 21, email: 'bob@example.com', session: '2024', grade: 'E'},
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'session', headerName: 'Session', width: 120},
  { field: 'grade', headerName: 'Grade', width: 100 },
];

const StudentDataGrid = ({ onRowClick }) => {
  return (
    <Box
      sx={{
        height: '60vh',
        width: '130%',
        display: 'flex',
        justifyContent: 'center',
        marginLeft:13,
        alignItems: 'center',
      
      }}
    >
      <Paper elevation={3} sx={{ width: '200%', maxWidth: '800px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={onRowClick}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none', // Remove default border
            },
            '& .MuiDataGrid-cell': {
          
              color: '#000', // Black text for readability
            },
            '& .MuiDataGrid-cell:hover': {
            //   bgcolor: '#ff9800', // Darker orange on hover
            },
            '& .MuiDataGrid-columnHeaders': {
            //   bgcolor: '#ff5722', // Bright red-orange header
            //   color: '#fff', // White text
            },
            '& .MuiDataGrid-footerContainer': {
            //   bgcolor: '#ffcc80', // Matching bright orange footer background
            },
            '& .MuiCheckbox-root': {
            //   color: '#ff5722', // Checkbox color
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default StudentDataGrid;

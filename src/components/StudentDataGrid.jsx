import React, { useEffect, useState, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Toolbar, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const StudentDataGrid = ({ onRowClick }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentData, setCurrentData] = useState({ name: '', age: '', email: '', session: '', grade: '' });
  const [newStudent, setNewStudent] = useState({ name: '', age: '', email: '', session: '', grade: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  // Fetch students data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items/');
        setRows(response.data);
        const total = response.data.length;
        const avgAge = total > 0 ? response.data.reduce((acc, curr) => acc + curr.age, 0) / total : 0;

        setTotalStudents(total);
        setAverageAge(avgAge);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${selectedId}/`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedId));
      setSnackbarMessage('Student deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setSnackbarMessage('Failed to delete student!');
      setSnackbarOpen(true);
    }
    setOpenDelete(false);
  };

  // Handle update action
  const handleUpdate = (id, data) => {
    setSelectedId(id);
    setCurrentData(data);
    setOpenUpdate(true);
  };

  // Confirm update action
  const confirmUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/items/${selectedId}/`, currentData);
      setRows((prevRows) => prevRows.map((row) => (row.id === selectedId ? response.data : row)));
      setSnackbarMessage('Student updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating item:', error);
      setSnackbarMessage('Failed to update student!');
      setSnackbarOpen(true);
    }
    setOpenUpdate(false);
  };

  // Handle add student action
  const handleAdd = () => {
    setOpenAdd(true);
  };

  // Confirm add student action
  const confirmAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/items/', newStudent);
      setRows((prevRows) => [...prevRows, response.data]);
      setNewStudent({ name: '', age: '', email: '', session: '', grade: '' });
      setSnackbarMessage('Student added successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding item:', error);
      setSnackbarMessage('Failed to add student!');
      setSnackbarOpen(true);
    }
    setOpenAdd(false);
  };

  // Filter rows based on search term
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'session', headerName: 'Session', width: 120 },
    { field: 'grade', headerName: 'Grade', width: 70 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around" width="100%">
          <IconButton
            aria-label="edit"
            onClick={() => handleUpdate(params.row.id, {
              name: params.row.name,
              age: params.row.age,
              email: params.row.email,
              session: params.row.session,
              grade: params.row.grade,
            })}
            sx={{ '&:hover': { color: '#1976d2' } }} // Hover effect
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)} sx={{ marginLeft: 1, '&:hover': { color: '#d32f2f' } }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f0f4f8',
          padding: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            maxWidth: 1000,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: 3,
          }}
        >
          <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#4a4a4a',
              }}
            >
              Student Management
            </Typography>
          </Box>

          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#888' }}>
              Total Students: {totalStudents}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#888' }}>
              Average Age: {averageAge.toFixed(2)}
            </Typography>
          </Box>

          <Paper
            elevation={2}
            sx={{
              padding: 2,
              backgroundColor: '#ffffff',
              borderRadius: 1,
              boxShadow: 'none',
            }}
          >
            <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{
                  marginRight: 2,
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1e88e5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              >
                Add Student
              </Button>
            </Toolbar>

            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              loading={loading}
              autoHeight
              onRowClick={(params) => onRowClick(params.row)}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-cell:hover': {
                  color: '#1976d2',
                },
              }}
            />
          </Paper>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this student?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Update Student Dialog */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={currentData.name}
            onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={currentData.age}
            onChange={(e) => setCurrentData({ ...currentData, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentData.email}
            onChange={(e) => setCurrentData({ ...currentData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Session"
            type="text"
            fullWidth
            value={currentData.session}
            onChange={(e) => setCurrentData({ ...currentData, session: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Grade"
            type="text"
            fullWidth
            value={currentData.grade}
            onChange={(e) => setCurrentData({ ...currentData, grade: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button onClick={confirmUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Session"
            type="text"
            fullWidth
            value={newStudent.session}
            onChange={(e) => setNewStudent({ ...newStudent, session: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Grade"
            type="text"
            fullWidth
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={confirmAdd} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudentDataGrid;

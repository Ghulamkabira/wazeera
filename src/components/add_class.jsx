import React from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const AddClass = () => {
    const [successMessage, setSuccessMessage] = useState('');
 
  const validationSchema = Yup.object({
    className: Yup.string().required('Class Name is required'),
    teacherName: Yup.string().required('Teacher Name is required'),
    studentCount: Yup.number().required('Number of Students is required').min(1, 'Must be at least 1'),
    totalPeriods: Yup.number().required('Total Periods is required').min(1, 'Must be at least 1'),
    classAttendance: Yup.number().required('Class Attendance is required').min(0, 'Must be at least 0').max(100, 'Must be at most 100'),
    classResult: Yup.number().required('Class Result is required').min(0, 'Must be at least 0').max(100, 'Must be at most 100'),
    classNotes: Yup.string().required('Class Notes are required'),
  });

  const formik = useFormik({
    initialValues: {
      className: '',
      teacherName: '',
      studentCount: '',
      totalPeriods: '',
      classAttendance: '',
      classResult: '',
      classNotes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setSuccessMessage('Class added successfully!');
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginLeft: { xs: 5, md: 30 }
      }}
    >
      <Card sx={{ maxWidth: 600, width: { xs: '90%', sm: '500px' } }}>
        <CardHeader
          title="Add New Class"
          sx={{ bgcolor: '#e3f2fd', textAlign: 'center', padding: 2, color: '#0d49a1' }}
        />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Class Name"
                variant="outlined"
                name="className"
                value={formik.values.className}
                onChange={formik.handleChange}
                error={formik.touched.className && Boolean(formik.errors.className)}
                helperText={formik.touched.className && formik.errors.className}
                required
              />
              <TextField
                label="Teacher Name"
                variant="outlined"
                name="teacherName"
                value={formik.values.teacherName}
                onChange={formik.handleChange}
                error={formik.touched.teacherName && Boolean(formik.errors.teacherName)}
                helperText={formik.touched.teacherName && formik.errors.teacherName}
                required
              />
              <TextField
                label="Number of Students"
                type="number"
                variant="outlined"
                name="studentCount"
                value={formik.values.studentCount}
                onChange={formik.handleChange}
                error={formik.touched.studentCount && Boolean(formik.errors.studentCount)}
                helperText={formik.touched.studentCount && formik.errors.studentCount}
                required
              />
              <TextField
                label="Total Periods"
                type="number"
                variant="outlined"
                name="totalPeriods"
                value={formik.values.totalPeriods}
                onChange={formik.handleChange}
                error={formik.touched.totalPeriods && Boolean(formik.errors.totalPeriods)}
                helperText={formik.touched.totalPeriods && formik.errors.totalPeriods}
                required
              />
              <TextField
                label="Class Attendance (%)"
                type="number"
                variant="outlined"
                name="classAttendance"
                value={formik.values.classAttendance}
                onChange={formik.handleChange}
                error={formik.touched.classAttendance && Boolean(formik.errors.classAttendance)}
                helperText={formik.touched.classAttendance && formik.errors.classAttendance}
                required
              />
              <TextField
                label="Class Result (%)"
                type="number"
                variant="outlined"
                name="classResult"
                value={formik.values.classResult}
                onChange={formik.handleChange}
                error={formik.touched.classResult && Boolean(formik.errors.classResult)}
                helperText={formik.touched.classResult && formik.errors.classResult}
                required
              />
              <TextField
                label="Class Notes"
                variant="outlined"
                name="classNotes"
                value={formik.values.classNotes}
                onChange={formik.handleChange}
                error={formik.touched.classNotes && Boolean(formik.errors.classNotes)}
                helperText={formik.touched.classNotes && formik.errors.classNotes}
                required
              />
              <Button type="submit" variant="contained" color="success">
                Add Class
              </Button>
            </Box>
          </form>
          {successMessage && (
                <Typography variant="h6" color="success.main" sx={{marginBottom:2,textAlign:"center"}}>
                    {successMessage}
                </Typography>
            )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddClass;

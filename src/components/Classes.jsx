import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Classes = () => {
    
    const classesData = [
        {
            id: 1,
            className: "9th Grade",
            teacher: {
                name: "Mr. Brown",
                subject: "English",
                email: "mr.brown@example.com"
            },
            students: [
                { id: 1, name: "Grace", email: "grace@example.com", grades: [80, 82, 85] },
                { id: 2, name: "Henry", email: "henry@example.com", grades: [78, 85, 88] },
                { id: 3, name: "Ivy", email: "ivy@example.com", grades: [90, 92, 88] }
            ],
            periods: [
                { id: 1, time: "9:00 - 10:00", subject: "English" },
                { id: 2, time: "10:15 - 11:15", subject: "History" }
            ],
            assignments: [
                { title: "Essay Writing", dueDate: "2024-10-12" },
                { title: "Reading Assignment", dueDate: "2024-10-18" }
            ],
            attendance: [
                { studentId: 1, date: "2024-10-01", status: "Present" },
                { studentId: 2, date: "2024-10-01", status: "Present" },
                { studentId: 3, date: "2024-10-01", status: "Absent" }
            ],
            classPerformance: {
                averageScore: 83,
                highestScore: 90,
                lowestScore: 78
            },
            notes: "Focus on literature and comprehension."
        },
        {
            id: 2,
            className: "10th Grade",
            teacher: {
                name: "Mr. Smith",
                subject: "Mathematics",
                email: "mr.smith@example.com"
            },
            students: [
                { id: 4, name: "Alice", email: "alice@example.com", grades: [85, 90, 78] },
                { id: 5, name: "Bob", email: "bob@example.com", grades: [75, 80, 82] },
                { id: 6, name: "Charlie", email: "charlie@example.com", grades: [88, 92, 84] }
            ],
            periods: [
                { id: 1, time: "8:00 - 9:00", subject: "Math" },
                { id: 2, time: "9:15 - 10:15", subject: "Science" }
            ],
            assignments: [
                { title: "Algebra Homework", dueDate: "2024-10-10" },
                { title: "Geometry Project", dueDate: "2024-10-15" }
            ],
            attendance: [
                { studentId: 4, date: "2024-10-01", status: "Present" },
                { studentId: 5, date: "2024-10-01", status: "Absent" },
                { studentId: 6, date: "2024-10-01", status: "Present" }
            ],
            classPerformance: {
                averageScore: 84,
                highestScore: 92,
                lowestScore: 75
            },
            notes: "Focus on advanced mathematics."
        },
        {
            id: 3,
            className: "11th Grade",
            teacher: {
                name: "Ms. Johnson",
                subject: "Science",
                email: "ms.johnson@example.com"
            },
            students: [
                { id: 7, name: "David", email: "david@example.com", grades: [90, 85, 88] },
                { id: 8, name: "Eva", email: "eva@example.com", grades: [92, 95, 94] },
                { id: 9, name: "Jia", email: "jia@example.com", grades: [92, 85, 94] }
            ],
            periods: [
                { id: 1, time: "10:30 - 11:30", subject: "Biology" },
                { id: 2, time: "11:45 - 12:45", subject: "Chemistry" }
            ],
            assignments: [
                { title: "Lab Report", dueDate: "2024-10-20" },
                { title: "Research Paper", dueDate: "2024-10-25" }
            ],
            attendance: [
                { studentId: 7, date: "2024-10-01", status: "Present" },
                { studentId: 8, date: "2024-10-01", status: "Present" },
                { studentId: 9, date: "2024-10-01", status: "Present" }
            ],
            classPerformance: {
                averageScore: 89,
                highestScore: 95,
                lowestScore: 85
            },
            notes: "Focus on practical experiments."
        },
        {
            id: 4,
            className: "12th Grade",
            teacher: {
                name: "Ms. Lee",
                subject: "Physics",
                email: "ms.lee@example.com"
            },
            students: [
                { id: 10, name: "Jack", email: "jack@example.com", grades: [92, 95, 96] },
                { id: 11, name: "Lucy", email: "lucy@example.com", grades: [88, 90, 85] },
                { id: 12, name: "Lichi", email: "lichi@example.com", grades: [88, 99, 85] }
            ],
            periods: [
                { id: 1, time: "11:30 - 12:30", subject: "Physics" },
                { id: 2, time: "12:45 - 1:45", subject: "Mathematics" }
            ],
            assignments: [
                { title: "Physics Project", dueDate: "2024-10-22" },
                { title: "Calculus Homework", dueDate: "2024-10-30" }
            ],
            attendance: [
                { studentId: 10, date: "2024-10-01", status: "Present" },
                { studentId: 11, date: "2024-10-01", status: "Present" },
                { studentId: 12, date: "2024-10-01", status: "Present" }
            ],
            classPerformance: {
                averageScore: 90,
                highestScore: 96,
                lowestScore: 85
            },
            notes: "Prepare for final exams."
        }
    ];

    return (
        <Box sx={{ py: 4, px: 4,width:'100%', bgcolor: '#f5f5f5', marginRight: { xs: 5, md: 20 } ,marginLeft:{xs:5,md:20} }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Classes</Typography>
            <Grid container spacing={2}>
                {classesData.map((classData) => (
                    <Grid item xs={12} sm={6} md={3} key={classData.id}> 
                        <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
                            <CardHeader 
                                title={`Class: ${classData.className}`} 
                                action={
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                }
                                sx={{ bgcolor: '#3f51b5', color: '#fff' }}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    Teacher: {classData.teacher.name} ({classData.teacher.subject})
                                </Typography>
                                <Typography variant="body2">Email: {classData.teacher.email}</Typography>

                                <Divider sx={{ my: 4 }} />

                                <Typography variant="h6">Students:</Typography>
                                <List>
                                    {classData.students.map(student => (
                                        <ListItem key={student.id}>
                                            <ListItemText 
                                                primary={student.name} 
                                                secondary={`Email: ${student.email} | Average: ${(student.grades.reduce((a, b) => a + b, 0) / student.grades.length).toFixed(2)}`} 
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 4 }} />

                                <Typography variant="h6">Periods:</Typography>
                                <List>
                                    {classData.periods.map(period => (
                                        <ListItem key={period.id}>
                                            <ListItemText primary={`${period.time} - ${period.subject}`} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 4 }} />

                                <Typography variant="h6">Assignments:</Typography>
                                <List>
                                    {classData.assignments.map((assignment, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={assignment.title} secondary={`Due: ${assignment.dueDate}`} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 4 }} />

                                <Typography variant="h6">Attendance:</Typography>
                                <List>
                                    {classData.attendance.map((record, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`Student ID: ${record.studentId}`} secondary={`Date: ${record.date} | Status: ${record.status}`} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 4 }} />

                                <Typography variant="h6">Class Performance:</Typography>
                                <Typography variant="body2">Average Score: {classData.classPerformance.averageScore}</Typography>
                                <Typography variant="body2">Highest Score: {classData.classPerformance.highestScore}</Typography>
                                <Typography variant="body2">Lowest Score: {classData.classPerformance.lowestScore}</Typography>

                                <Divider sx={{ my: 4}} />

                                <Typography variant="h6">Notes:</Typography>
                                <Typography variant="body2">{classData.notes}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Classes;

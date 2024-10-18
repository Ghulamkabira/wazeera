import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentMarksGraph = () => {
  const studentMarks = [78, 85, 92, 70, 88]; // Marks obtained by students

  const data = {
    labels: ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'], // Labels for students
    datasets: [
      {
        label: 'Marks Obtained',
        data: studentMarks,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Color for Student 1
          'rgba(153, 102, 255, 0.6)', // Color for Student 2
          'rgba(255, 159, 64, 0.6)',   // Color for Student 3
          'rgba(255, 99, 132, 0.6)',   // Color for Student 4
          'rgba(54, 162, 235, 0.6)',    // Color for Student 5
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows for custom height
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          font: {
            size: 14, // Font size for legend
          },
        },
      },
      title: {
        display: true,
        text: 'Student Marks Distribution',
        font: {
          size: 18, // Font size for title
          weight: 'bold', // Make title bold
        },
      },
    },
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',           // Flexbox for centering
      flexDirection: 'column',   // Column direction for stacking
      alignItems: 'center',      // Center children horizontally
      justifyContent: 'center'    // Center children vertically
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student Marks Distribution</h2>
      <div style={{ 
        height: '300px', 
        width: '300px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' // Center the pie chart vertically
      }}>
        <Pie data={data} options={options} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default StudentMarksGraph;

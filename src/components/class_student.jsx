import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { class: 'Class A', students: 30 },
  { class: 'Class B', students: 45 },
  { class: 'Class C', students: 25 },
  { class: 'Class D', students: 50 },
  { class: 'Class E', students: 20 },
];

const ClassStudentsChart = () => {
  return (
    <div style={chartContainerStyle}>
      <h3 style={titleStyle}>Class vs. Students Analysis</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
          <XAxis dataKey="class" tick={{ fill: '#6c757d' }} tickLine={false} />
          <YAxis tick={{ fill: '#6c757d' }} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'none' }}
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #d1d1d1', borderRadius: '5px' }}
          />
          <Legend wrapperStyle={{ color: '#555', fontSize: '14px' }} />
          <Bar dataKey="students" fill="#4e73df" barSize={40} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const chartContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  margin: '20px auto',
  maxWidth: '800px',
};

const titleStyle = {
  marginLeft:'10',
  textAlign: 'center',
  marginBottom: '15px',
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
};

export default ClassStudentsChart;

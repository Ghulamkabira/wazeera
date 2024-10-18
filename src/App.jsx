import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/LoginPage';
import Signup from './components/Signup';
import AddStudent from './components/add_students';
import StudentDataGrid from './components/StudentDataGrid';
import { Box } from '@mui/material';
import DashboardLayoutBasic from './components/dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import NewAdmission from './components/New_Admission';
import Classes from './components/Classes';
import AddClass from './components/add_class';
import AttendanceReports from './components/attendance_reports';
import GradesReports from './components/grades_reports';


const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google client ID

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  const handleLogout = () => {
    // Clear tokens and update authentication state
    localStorage.removeItem('accessTokens');
    setIsAuthenticated(false); // Set to false to indicate user is logged out
  };

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login onLogin={() => setIsAuthenticated(true)} />
    },
    {
      path: "/students",
      element: <StudentDataGrid />
    },
  
    {
      path: "/addstudent",
      element: <AddStudent />
    },
    {
      path: "newadmission",
      element: <NewAdmission />
    }, 
    {
      path: "classes",
      element: <Classes />
    },
    {
      path: "/addclass",
      element: <AddClass />
    },
    {
      path:"/attendance-reports",
      element:<AttendanceReports/>
    },
    {
      path:"/grades-reports",
      element:<GradesReports/>
    },
    {
      path: "/", 
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayoutBasic onLogout={handleLogout} />
        </ProtectedRoute>
      ) // Protect the Dashboard route
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  );
}

export default App;

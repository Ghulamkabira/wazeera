import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AddStudent from './add_students';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StudentDataGrid from './StudentDataGrid'; // Ensure this path is correct
import NewAdmission from './New_Admission';
import Classes from './Classes';
import AddClass from './add_class';
import AttendanceReports from './attendance_reports';
import GradesReports from './grades_reports';
import Signup from './Signup';
import Login from './LoginPage';
import ClassStudentsChart from './class_student';
import StudentMarksGraph from './Student_Marks';
// Navigation items
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Student Management',
  },
  {
    segment: 'newadmission',
    title: 'New Admission',
    icon: <PeopleIcon />,
  },
  {
    segment: 'addstudent',
    title: 'Add Student',
    icon: <PeopleIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Class Management',
  },
  {
    segment: 'classes',
    title: 'Classes',
    icon: <ClassIcon />,
  },
  {
    segment: 'addclass',
    title: 'Add Class',
    icon: <ClassIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Reports',
  },
  {
    segment: 'attendance-reports',
    title: 'Attendance Reports',
    icon: <AssessmentIcon />,
  },
  {
    segment: 'grades-reports',
    title: 'GradesReports',
    icon: <AssessmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'app-settings',
    title: 'App Settings',
    icon: <SettingsIcon />,
  },
];

// Theme setup
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, onNavigate }) {

  switch (pathname) {
    case '/':
    case '/dashboard':
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
            overflowX: 'hidden', 
          }}
        >
          <Card sx={{ width: '100%', marginBottom: 2, textAlign: 'center' }}>
            <CardHeader title="Welcome to the Dashboard" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Here you can manage your students and classes.
              </Typography>
            </CardContent>
          </Card>
          <StudentDataGrid onRowClick={(params) => onNavigate(`/studentdetail?id=${params.row.id}`)} />
          <Box 
             sx={{ width: '100%', marginTop: 4 }}>
            <Card>
              <CardHeader title="Class vs Students Chart" />
              <CardContent>
                <ClassStudentsChart />
              </CardContent>
            </Card>
          </Box>
          <Box 
             sx={{ width: '100%', marginTop: 6 }}>
            <Card>
              <CardHeader title="Student Marks Chart" />
              <CardContent>
                <StudentMarksGraph />
              </CardContent>
            </Card>
          </Box>
        </Box>
      );
        case '/newadmission':
         return <NewAdmission />;
        case '/addstudent':
         return <AddStudent />;
        case '/classes':
         return <Classes />;
        case '/addclass':
         return <AddClass />;
        case '/attendance-reports':
          return <AttendanceReports />;
        case'/grades-reports':
          return<GradesReports/>;

    default:
      return <Typography variant="h6" color="error">404 - Page Not Found</Typography>;
  }
}

export default function DashboardLayoutBasic({ onLogout }) {
  const [pathname, setPathname] = React.useState('/dashboard'); // Start at dashboard by default

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  // Logout handler
  const handleLogout = () => {
    onLogout(); 
    setPathname('/login'); 
  }

  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/login') {
      setPathname('/dashboard');
    }
  }, []);
  

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, width: '80%', maxWidth: '100vw' }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Box>
        <DemoPageContent pathname={pathname} onNavigate={router.navigate} />
      </DashboardLayout>
    </AppProvider>
  );
}

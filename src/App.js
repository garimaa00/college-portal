
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import BIMCourseDetails from './components/BIMCourseDetails';
import ViewAttendance from './components/ViewAttendance';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/student" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/teacher" element={<PrivateRoute role="teacher"><TeacherDashboard /></PrivateRoute>} />
          <Route path="/bim-course-details" element={<PrivateRoute role="student"><BIMCourseDetails /></PrivateRoute>} />
          <Route path="/attendance/view/:role?" element={<PrivateRoute role="student"><ViewAttendance /></PrivateRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

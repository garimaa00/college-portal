import { useEffect, useState } from 'react'; // Add explicit imports for hooks
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import AssignmentForm from './forms/AssignmentForm';
import CourseForm from './forms/CourseForm';
import ExamRoutineForm from './forms/ExamRoutineForm';
import NotificationForm from './forms/NotificationForm';
import UpdateSeatsForm from './forms/UpdateSeatsForm';
import EventForm from './forms/EventForm';
import FeeDueForm from './forms/FeeDueForm';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('http://localhost:8000/api/notifications/');
        dispatch({ type: 'SET_NOTIFICATIONS', payload: res.data });
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Button onClick={handleLogout} variant="danger" className="mb-3">
        Logout
      </Button>
      <h2>Add Assignment</h2>
      <AssignmentForm />
      <h2>Add Course</h2>
      <CourseForm />
      <h2>Set Exam Routine</h2>
      <ExamRoutineForm />
      <h2>Send Notifications</h2>
      <NotificationForm />
      <h2>Update Seats</h2>
      <UpdateSeatsForm />
      <h2>Post Event</h2>
      <EventForm />
      <h2>Alert Fee Dues</h2>
      <FeeDueForm />
      <h2>Notifications</h2>
      {notifications.map((notif) => (
        <Alert key={notif.id} variant="info">
          {notif.message}
        </Alert>
      ))}
    </Container>
  );
};

export default AdminDashboard;
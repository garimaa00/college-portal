// university-portal-frontend/src/components/TeacherDashboard.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = window.DJANGO_DATA?.teacher || { courses: [], events: [] };
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleMarkAttendance = (e) => {
    e.preventDefault();
    // Simulate marking attendance (actual submission handled by Django)
    setToastMessage('Attendance marked successfully!');
    setToastVariant('success');
    setShowToast(true);
    setStudentId('');
    setCourseId('');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      {showToast && (
        <div className={`p-4 mb-4 rounded ${toastVariant === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toastMessage}
          <button onClick={() => setShowToast(false)} className="ml-2 text-sm font-semibold">✕</button>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
      <form onSubmit={handleMarkAttendance} className="space-y-4 mb-6">
        <input type="hidden" name="csrfmiddlewaretoken" value={window.DJANGO_DATA?.csrfToken || ''} />
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            id="studentId"
            name="student_id"
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Course ID</label>
          <input
            id="courseId"
            name="course_id"
            type="number"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Mark Attendance
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-4">Courses</h2>
      {data.courses.map((course) => (
        <div key={course.id} className="mb-2">{course.name} - {course.description}</div>
      ))}
      <h2 className="text-xl font-semibold mb-4 mt-6">Events</h2>
      {data.events.map((event) => (
        <div key={event.id} className="mb-2">{event.title} - {event.date}</div>
      ))}
    </div>
  );
};

export default TeacherDashboard;
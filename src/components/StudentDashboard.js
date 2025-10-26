// university-portal-frontend/src/components/StudentDashboard.js
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = window.DJANGO_DATA?.student || {
    attendance: { attended_days: 0, total_days: 0, percentage: 0 },
    courses: [],
    events: [],
  };
  const showToast = data.attendance.percentage < 80;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      {showToast && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          <strong>Attendance Alert:</strong> Your attendance is {data.attendance.percentage.toFixed(2)}%, below 80%!
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">View Attendance</h2>
      <Link to="/attendance/view" className="text-blue-600 hover:underline">View Attendance Details</Link>
      <p className="mt-2">
        Attended: {data.attendance.attended_days} / Total: {data.attendance.total_days}
      </p>
      <h2 className="text-xl font-semibold mb-4 mt-6">Course Details</h2>
      <Link to="/bim-course-details" className="text-blue-600 hover:underline">View BIM Course Details</Link>
      <div className="mt-2">
        {data.courses.map((course) => (
          <div key={course.id} className="mb-2">{course.name} - {course.description}</div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4 mt-6">Events</h2>
      {data.events.map((event) => (
        <div key={event.id} className="mb-2">{event.title} - {event.date}</div>
      ))}
    </div>
  );
};

export default StudentDashboard;
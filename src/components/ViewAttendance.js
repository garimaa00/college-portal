// university-portal-frontend/src/components/ViewAttendance.js
import { useNavigate } from 'react-router-dom';

const ViewAttendance = () => {
  const navigate = useNavigate();
  const attendanceData = window.DJANGO_DATA?.attendance || {
    attended_days: 0,
    total_days: 0,
    percentage: 0,
    courses: [],
  };
  const role = window.DJANGO_DATA?.role || 'student';
  const error = window.DJANGO_DATA?.error || '';

  const handleBack = () => {
    navigate(role === 'teacher' ? '/teacher' : '/student');
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">View Attendance</h1>
      <button
        onClick={handleBack}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      {attendanceData.percentage < 80 && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          <strong>Low Attendance Alert:</strong> Your attendance is {attendanceData.percentage.toFixed(2)}%, below the required 80%.
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Attendance Summary</h2>
        <p className="text-gray-700 mb-2">
          <strong>Attended Days:</strong> {attendanceData.attended_days}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Total Days:</strong> {attendanceData.total_days}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Attendance Percentage:</strong> {attendanceData.percentage.toFixed(2)}%
        </p>
        <h3 className="text-xl font-semibold mb-2">Course-wise Attendance</h3>
        {attendanceData.courses.length > 0 ? (
          <ul className="list-disc pl-5">
            {attendanceData.courses.map((course) => (
              <li key={course.id} className="mb-2">
                {course.name}: {course.attended_days} / {course.total_days} (
                {(course.attended_days / course.total_days * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No attendance data available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
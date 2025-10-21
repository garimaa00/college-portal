import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    exams: [],
    fees: [],
    notifications: [],
    faculty: [],
    teacherAttendance: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('student/dashboard/')
      .then(res => {
        setData({
          exams: res.data.exams,
          fees: res.data.fees,
          notifications: res.data.notifications,
          faculty: res.data.faculty,
          teacherAttendance: res.data.teacher_attendance,
        });
      })
      .catch(err => setError('Failed to fetch dashboard data'));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard (BIM)</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Exam Schedules</h2>
        <ul className="list-disc pl-5">
          {data.exams.map(exam => (
            <li key={exam.id} className="mb-2">
              {exam.subject} - Semester {exam.semester} - {new Date(exam.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Fee Reminders</h2>
        <ul className="list-disc pl-5">
          {data.fees.map(fee => (
            <li key={fee.id} className="mb-2">
              Amount: ${fee.amount} - Due: {new Date(fee.due_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <ul className="list-disc pl-5">
          {data.notifications.map(post => (
            <li key={post.id} className="mb-2">
              <strong>{post.title}</strong> ({post.category}) - {post.body} - {new Date(post.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Faculty</h2>
        <ul className="list-disc pl-5">
          {data.faculty.map(fac => (
            <li key={fac.id} className="mb-2">
              {fac.name} - {fac.subject}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Teacher Attendance</h2>
        <ul className="list-disc pl-5">
          {data.teacherAttendance.map(att => (
            <li key={att.id} className="mb-2">
              {att.user.username} - {att.is_present ? 'Present' : 'Absent'} - {new Date(att.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
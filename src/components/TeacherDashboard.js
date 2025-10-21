import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

function TeacherDashboard() {
  const { user } = useContext(AuthContext);
  const [attendance, setAttendance] = useState({ is_present: true });
  const [studentAttendance, setStudentAttendance] = useState({ studentId: '', is_present: true });
  const [notice, setNotice] = useState({ subject: '', details: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('teacher/attendance/', attendance);
      setSuccess('Attendance marked successfully');
      setError(null);
    } catch (err) {
      setError('Failed to mark attendance');
      setSuccess(null);
    }
  };

  const handleStudentAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('teacher/attendance/', { user: studentAttendance.studentId, is_present: studentAttendance.is_present });
      setSuccess('Student attendance marked successfully');
      setError(null);
    } catch (err) {
      setError('Failed to mark student attendance');
      setSuccess(null);
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('teacher/notice/', notice);
      setSuccess('Notice posted successfully');
      setError(null);
      setNotice({ subject: '', details: '' });
    } catch (err) {
      setError('Failed to post notice');
      setSuccess(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Mark Your Attendance</h2>
        <form onSubmit={handleAttendanceSubmit} className="space-y-4">
          <div>
            <label className="block">Status</label>
            <select
              value={attendance.is_present}
              onChange={(e) => setAttendance({ is_present: e.target.value === 'true' })}
              className="border p-2 rounded"
            >
              <option value="true">Present</option>
              <option value="false">Absent</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Attendance</button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Mark Student Attendance</h2>
        <form onSubmit={handleStudentAttendanceSubmit} className="space-y-4">
          <div>
            <label className="block">Student ID</label>
            <input
              type="text"
              value={studentAttendance.studentId}
              onChange={(e) => setStudentAttendance({ ...studentAttendance, studentId: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter student ID"
            />
          </div>
          <div>
            <label className="block">Status</label>
            <select
              value={studentAttendance.is_present}
              onChange={(e) => setStudentAttendance({ ...studentAttendance, is_present: e.target.value === 'true' })}
              className="border p-2 rounded"
            >
              <option value="true">Present</option>
              <option value="false">Absent</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Student Attendance</button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Post Notice/Assignment</h2>
        <form onSubmit={handleNoticeSubmit} className="space-y-4">
          <div>
            <label className="block">Subject</label>
            <input
              type="text"
              value={notice.subject}
              onChange={(e) => setNotice({ ...notice, subject: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block">Details</label>
            <textarea
              value={notice.details}
              onChange={(e) => setNotice({ ...notice, details: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter notice or assignment details"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Post Notice</button>
        </form>
      </div>
    </div>
  );
}

export default TeacherDashboard;
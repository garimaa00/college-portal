// university-portal-frontend/src/components/forms/ExamRoutineForm.js
import { useState } from 'react';

const ExamRoutineForm = () => {
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage('Exam routine set successfully!');
    setToastVariant('success');
    setShowToast(true);
    setCourseId('');
    setDate('');
    setTime('');
    setVenue('');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Set Exam Routine</h3>
      {showToast && (
        <div className={`p-4 mb-4 rounded ${toastVariant === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toastMessage}
          <button onClick={() => setShowToast(false)} className="ml-2 text-sm font-semibold">✕</button>
        </div>
      )}
      <form onSubmit={handleSubmit} action="/exam-routines/add/" method="POST" className="space-y-4">
        <input type="hidden" name="csrfmiddlewaretoken" value={window.DJANGO_DATA?.csrfToken || ''} />
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
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            id="venue"
            name="venue"
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Set Exam Routine
        </button>
      </form>
    </div>
  );
};

export default ExamRoutineForm;
// university-portal-frontend/src/components/forms/AssignmentForm.js
import { useState } from 'react';

const AssignmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission (actual handling in Django)
    setToastMessage('Assignment added successfully!');
    setToastVariant('success');
    setShowToast(true);
    setTitle('');
    setDescription('');
    setCourseId('');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Add Assignment</h3>
      {showToast && (
        <div className={`p-4 mb-4 rounded ${toastVariant === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toastMessage}
          <button onClick={() => setShowToast(false)} className="ml-2 text-sm font-semibold">✕</button>
        </div>
      )}
      <form onSubmit={handleSubmit} action="/assignments/add/" method="POST" className="space-y-4">
        <input type="hidden" name="csrfmiddlewaretoken" value={window.DJANGO_DATA?.csrfToken || ''} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Add Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
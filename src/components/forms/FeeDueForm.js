// university-portal-frontend/src/components/forms/FeeDueForm.js
import { useState } from 'react';

const FeeDueForm = () => {
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage('Fee due alert sent successfully!');
    setToastVariant('success');
    setShowToast(true);
    setStudentId('');
    setAmount('');
    setDueDate('');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Alert Fee Dues</h3>
      {showToast && (
        <div className={`p-4 mb-4 rounded ${toastVariant === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toastMessage}
          <button onClick={() => setShowToast(false)} className="ml-2 text-sm font-semibold">✕</button>
        </div>
      )}
      <form onSubmit={handleSubmit} action="/fee-dues/add/" method="POST" className="space-y-4">
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
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            id="dueDate"
            name="due_date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Alert Fee Due
        </button>
      </form>
    </div>
  );
};

export default FeeDueForm;
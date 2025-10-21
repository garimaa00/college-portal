import React, { useState } from 'react';
import axios from 'axios';

function Attendance({ token }) {
  const [isPresent, setIsPresent] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/teacher/attendance/', { is_present: isPresent }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage(error.response?.data?.error || 'Error'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Present:
          <input
            type="checkbox"
            checked={isPresent}
            onChange={(e) => setIsPresent(e.target.checked)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Attendance;
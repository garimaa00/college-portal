import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login/', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.access);
        setToken(response.data.access);
      })
      .catch(error => console.error('Login error:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
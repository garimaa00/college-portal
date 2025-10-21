import React, { createContext, useState, useEffect } from 'react';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('student/dashboard/').then(res => {
        setUser({ type: 'student', ...res.data });
        setLoading(false);
      }).catch(() => {
        api.get('teacher/attendance/').then(res => {
          setUser({ type: 'teacher', ...res.data });
          setLoading(false);
        }).catch(() => {
          setUser(null);
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('login/', { username, password });
      localStorage.setItem('token', res.data.access);
      const userRes = await api.get('student/dashboard/');
      setUser({ type: 'student', ...userRes.data });
      return { success: true, userType: 'student' };
    } catch (err) {
      try {
        const teacherRes = await api.get('teacher/attendance/');
        setUser({ type: 'teacher', ...teacherRes.data });
        return { success: true, userType: 'teacher' };
      } catch {
        return { success: false, error: 'Invalid credentials' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
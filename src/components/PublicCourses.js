import React, { useState, useEffect } from 'react';
import api from '../api';

function PublicCourses() {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses
    api.get('courses/')
      .then(res => setCourses(res.data))
      .catch(err => setError('Failed to fetch courses'));

    // Fetch events
    api.get('events/')
      .then(res => setEvents(res.data))
      .catch(err => setError('Failed to fetch events'));

    // Fetch programs
    api.get('programs/')
      .then(res => setPrograms(res.data))
      .catch(err => setError('Failed to fetch programs'));
  }, []);

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">BIM University Portal</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BIM Courses Offered</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <div key={course.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{course.name} ({course.level})</h3>
                <p className="text-gray-700">Available Seats: {course.available_seats}</p>
                <p className="text-gray-700">Fee: ${course.fee_structure}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No events scheduled.</p>
        ) : (
          <ul className="list-disc pl-5">
            {events.map(event => (
              <li key={event.id} className="mb-2">
                <strong>{event.title}</strong> - {event.description} - {new Date(event.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Campus Programs & Tournaments</h2>
        {programs.length === 0 ? (
          <p className="text-gray-500">No programs available.</p>
        ) : (
          <ul className="list-disc pl-5">
            {programs.map(program => (
              <li key={program.id} className="mb-2">
                <strong>{program.name}</strong> - {program.details}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PublicCourses;
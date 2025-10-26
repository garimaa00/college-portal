// university-portal-frontend/src/components/BIMCourseDetails.js
import { useNavigate } from 'react-router-dom';

const BIMCourseDetails = () => {
  const navigate = useNavigate();
  const courseData = window.DJANGO_DATA?.course || {
    name: '',
    description: '',
    credits: 0,
    assignments: [],
    syllabus: [],
  };
  const error = window.DJANGO_DATA?.error || '';

  const handleBack = () => {
    navigate('/student');
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
      <h1 className="text-3xl font-bold mb-6">BIM Course Details</h1>
      <button
        onClick={handleBack}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{courseData.name}</h2>
        <p className="text-gray-700 mb-2"><strong>Description:</strong> {courseData.description}</p>
        <p className="text-gray-700 mb-4"><strong>Credits:</strong> {courseData.credits}</p>
        <h3 className="text-xl font-semibold mb-2">Assignments</h3>
        {courseData.assignments.length > 0 ? (
          <ul className="list-disc pl-5">
            {courseData.assignments.map((assignment) => (
              <li key={assignment.id} className="mb-2">
                {assignment.title} - Due: {assignment.due_date}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No assignments available.</p>
        )}
        <h3 className="text-xl font-semibold mb-2 mt-4">Syllabus</h3>
        {courseData.syllabus.length > 0 ? (
          <ul className="list-disc pl-5">
            {courseData.syllabus.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No syllabus available.</p>
        )}
      </div>
    </div>
  );
};

export default BIMCourseDetails;
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentCard.css';

const StudentCard = ({ student, onDelete }) => {
  const averageGrade = student.grades && student.grades.length > 0
    ? (student.grades.reduce((sum, grade) => sum + (grade.score || 0), 0) / student.grades.length).toFixed(1)
    : 'N/A';

  return (
    <div className="student-card">
      <div className="student-card-header">
        <h3>{student.firstName} {student.lastName}</h3>
        <div className="student-card-actions">
          <Link to={`/students/edit/${student._id}`} className="btn-edit">
            ✏️ Edit
          </Link>
          <button onClick={() => onDelete(student._id)} className="btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
      <div className="student-card-body">
        <div className="student-info">
          <p><strong>Email:</strong> {student.email || 'N/A'}</p>
          <p><strong>Class:</strong> {student.class || 'N/A'}</p>
          <p><strong>Roll No:</strong> {student.rollNo || 'N/A'}</p>
          <p><strong>Average Grade:</strong> {averageGrade}</p>
        </div>
        {student.grades && student.grades.length > 0 && (
          <div className="student-grades">
            <h4>Grades:</h4>
            <div className="grades-list">
              {student.grades.map((grade, index) => (
                <span key={index} className="grade-badge">
                  {grade.subject}: {grade.score}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;


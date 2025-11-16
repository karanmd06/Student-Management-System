import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentsAPI } from '../services/api';
import './StudentForm.css';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    class: '',
    rollNo: '',
    grades: [{ subject: '', score: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await studentsAPI.getById(id);
      const student = response.data;
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        class: student.class || '',
        rollNo: student.rollNo || '',
        grades: student.grades && student.grades.length > 0
          ? student.grades.map(g => ({ subject: g.subject || '', score: g.score || '' }))
          : [{ subject: '', score: '' }]
      });
    } catch (err) {
      setError('Failed to fetch student data');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...formData.grades];
    newGrades[index] = {
      ...newGrades[index],
      [field]: field === 'score' ? (value === '' ? '' : Number(value)) : value
    };
    setFormData({ ...formData, grades: newGrades });
  };

  const addGrade = () => {
    setFormData({
      ...formData,
      grades: [...formData.grades, { subject: '', score: '' }]
    });
  };

  const removeGrade = (index) => {
    if (formData.grades.length > 1) {
      setFormData({
        ...formData,
        grades: formData.grades.filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Clean up grades - remove empty ones and convert score to number
      const cleanedGrades = formData.grades
        .filter(grade => grade.subject.trim() !== '' && grade.score !== '')
        .map(grade => ({
          subject: grade.subject.trim(),
          score: Number(grade.score)
        }));

      const studentData = {
        ...formData,
        grades: cleanedGrades
      };

      if (isEdit) {
        await studentsAPI.update(id, studentData);
        setSuccess('Student updated successfully!');
      } else {
        await studentsAPI.create(studentData);
        setSuccess('Student created successfully!');
      }

      setTimeout(() => {
        navigate('/students');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-page">
      <div className="container">
        <div className="form-header">
          <h1>{isEdit ? 'Edit Student' : 'Add New Student'}</h1>
          <button onClick={() => navigate('/students')} className="btn btn-secondary">
            ← Back to Students
          </button>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  placeholder="Enter class"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Enter roll number"
              />
            </div>

            <div className="grades-section">
              <div className="grades-header">
                <h3>Grades</h3>
                <button type="button" onClick={addGrade} className="btn-add-grade">
                  + Add Grade
                </button>
              </div>
              {formData.grades.map((grade, index) => (
                <div key={index} className="grade-row">
                  <div className="form-group">
                    <input
                      type="text"
                      value={grade.subject}
                      onChange={(e) => handleGradeChange(index, 'subject', e.target.value)}
                      placeholder="Subject"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={grade.score}
                      onChange={(e) => handleGradeChange(index, 'score', e.target.value)}
                      placeholder="Score (0-100)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGrade(index)}
                    className="btn-remove-grade"
                    disabled={formData.grades.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (isEdit ? 'Update Student' : 'Create Student')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/students')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;


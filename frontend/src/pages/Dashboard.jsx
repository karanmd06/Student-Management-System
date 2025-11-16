import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    averageGrade: 0,
    topStudents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await studentsAPI.getAll();
      const students = response.data;

      const total = students.length;
      
      let totalGrade = 0;
      let gradeCount = 0;
      students.forEach(student => {
        if (student.grades && student.grades.length > 0) {
          student.grades.forEach(grade => {
            totalGrade += grade.score || 0;
            gradeCount++;
          });
        }
      });
      const averageGrade = gradeCount > 0 ? (totalGrade / gradeCount).toFixed(1) : 0;

      // Calculate top students by average grade
      const studentsWithAvg = students.map(student => {
        if (student.grades && student.grades.length > 0) {
          const avg = student.grades.reduce((sum, grade) => sum + (grade.score || 0), 0) / student.grades.length;
          return { ...student, avgGrade: avg };
        }
        return { ...student, avgGrade: 0 };
      });

      const topStudents = studentsWithAvg
        .sort((a, b) => b.avgGrade - a.avgGrade)
        .slice(0, 5);

      setStats({ total, averageGrade, topStudents });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <Link to="/students/new" className="btn btn-primary">
            + Add New Student
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total Students</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Average Grade</h3>
              <p className="stat-value">{stats.averageGrade}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Top Students</h2>
          {stats.topStudents.length > 0 ? (
            <div className="top-students-list">
              {stats.topStudents.map((student, index) => (
                <div key={student._id} className="top-student-item">
                  <div className="rank">#{index + 1}</div>
                  <div className="student-details">
                    <h4>{student.firstName} {student.lastName}</h4>
                    <p>{student.class || 'N/A'} • Roll No: {student.rollNo || 'N/A'}</p>
                  </div>
                  <div className="student-grade">
                    <span className="grade-badge">Avg: {student.avgGrade.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No students with grades yet.</p>
          )}
        </div>

        <div className="card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/students" className="action-card">
              <div className="action-icon">📋</div>
              <h3>View All Students</h3>
              <p>Browse and manage all students</p>
            </Link>
            <Link to="/students/new" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Add Student</h3>
              <p>Register a new student</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


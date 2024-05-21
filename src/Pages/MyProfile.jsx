import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = ({ studentId = "student_id_2" }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define dummy data
  const dummyData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    enrollment_year: 2020,
    field_id: 'Computer Science'
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${studentId}`);
        if (!response.ok) {
          const errorMessage = `Error: ${response.statusText} (status: ${response.status})`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
        // Use dummy data in case of error
        setProfile(dummyData);
      }
    };
    fetchProfile();
  }, [studentId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Profile</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Profile Information</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-0"><strong>Name:</strong> {profile.name}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Email:</strong> {profile.email}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-0"><strong>Enrollment Year:</strong> {profile.enrollment_year}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Field:</strong> {profile.field_id}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => navigate('/myperformance')}>
              My Performance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

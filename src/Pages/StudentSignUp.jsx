import React, { useState } from 'react';

const StudentSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');
  const [field, setField] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, enrollmentYear, field }),
      });
      if (response.ok) {
        alert('Sign-up successful');
        // Clear the input fields
        setName('');
        setEmail('');
        setPassword('');
        setEnrollmentYear('');
        setField('');
      } else {
        alert('Sign-up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Sign-Up</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enrollment Year"
          value={enrollmentYear}
          onChange={(e) => setEnrollmentYear(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default StudentSignUp;

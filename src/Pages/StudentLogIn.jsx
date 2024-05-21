import React, { useState } from 'react';

const StudentLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch(`/students?email=${email}&password=${password}`);
    if (response.ok) {
      // onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Login</h2>
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
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentLogin;

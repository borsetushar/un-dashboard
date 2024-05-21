import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // Assuming you have an AdminLogin component

const Dashboard = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const toggleAdminLogin = () => {
    setShowAdminLogin(!showAdminLogin);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <h2>University Dashboard</h2>
            <div>
              <NavLink to="/adminlogin" className="btn btn-secondary me-2">Admin LogIn</NavLink>
              <NavLink to="/myprofile" className="btn btn-secondary">My Profile</NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Welcome!</h5>
                <p className="card-text text-center">Please select an option below:</p>
                <div className="d-grid gap-2">
                  <NavLink to="/login" className="btn btn-primary">Log In</NavLink>
                  <NavLink to="/signup" className="btn btn-secondary">Sign Up</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// pages/Dashboard.jsx - Regular user dashboard

import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-header">
          <span className="page-tag">// USER DASHBOARD</span>
          <h1 className="page-title">Welcome, {user?.name}</h1>
          <p className="page-sub">You are logged in as a <strong>{user?.role}</strong></p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">NAME</span>
            <span className="info-value">{user?.name}</span>
          </div>
          <div className="info-card">
            <span className="info-label">EMAIL</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-card">
            <span className="info-label">ROLE</span>
            <span className="info-value role-badge">{user?.role}</span>
          </div>
          <div className="info-card">
            <span className="info-label">STATUS</span>
            <span className="info-value status-active">● Active</span>
          </div>
        </div>

        <div className="access-box">
          <h3>Your Access Level</h3>
          <ul>
            <li>✅ View your profile</li>
            <li>✅ Update your profile</li>
            <li>❌ Access Admin Panel</li>
            <li>❌ Manage other users</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

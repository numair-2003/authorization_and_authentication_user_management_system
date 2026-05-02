// pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="home-inner">
        <span className="home-tag">// MERN AUTH — WEEK 2</span>
        <h1 className="home-title">
          Secure Auth<br />
          <em>with JWT & RBAC</em>
        </h1>
        <p className="home-desc">
          Full-stack authentication system built with MongoDB, Express, React and Node.js.
          Features JWT tokens, bcrypt password hashing, and role-based access control.
        </p>

        <div className="home-btns">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-home-primary">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-home-primary">Get Started →</Link>
              <Link to="/login"  className="btn-home-secondary">Login</Link>
            </>
          )}
        </div>

        <div className="home-features">
          {[
            { icon: '🔐', label: 'JWT Authentication' },
            { icon: '🔒', label: 'bcrypt Password Hashing' },
            { icon: '👑', label: 'Role-Based Access Control' },
            { icon: '🛡️', label: 'Protected Routes' },
          ].map((f) => (
            <div key={f.label} className="feature-chip">
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

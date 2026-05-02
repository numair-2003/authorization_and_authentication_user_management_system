// pages/Profile.jsx - Update profile

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfileAPI } from '../services/api';
import './Auth.css';
import './Dashboard.css';

const Profile = () => {
  const { user, login }       = useAuth();
  const [form, setForm]       = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError]     = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await updateProfileAPI(form);
      login(localStorage.getItem('token'), res.data.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-tag">// PROFILE</span>
          <h1 className="auth-title">Edit Profile</h1>
          <p className="auth-sub">Update your account information</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>NAME</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>EMAIL</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>ROLE</label>
            <input type="text" value={user?.role} disabled style={{ opacity: 0.5 }} />
          </div>

          {error   && <p className="auth-error">⚠ {error}</p>}
          {success && <p style={{ color: '#47ffaa', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>✓ {success}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : 'SAVE CHANGES'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

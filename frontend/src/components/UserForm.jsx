import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onAddUser, loading }) => {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Both name and email are required.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await onAddUser({ name: name.trim(), email: email.trim() });
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user.');
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <span className="form-tag">// ADD USER</span>
        <h2 className="form-title">New Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="user-form" noValidate>
        <div className="field">
          <label htmlFor="name">NAME</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="off"
          />
        </div>

        {error && <p className="form-error">⚠ {error}</p>}

        <button type="submit" className="btn-add" disabled={loading}>
          {loading ? (
            <span className="spinner" />
          ) : (
            '+ ADD USER'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
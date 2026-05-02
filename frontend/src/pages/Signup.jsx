// pages/Signup.jsx 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    console.log('=== SIGNUP DEBUG ===');
    console.log('1. Form data:', form);
    console.log('2. API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000');
    console.log('===================');

    try {
      console.log('3. Calling signupAPI...');
      const res = await signupAPI(form);
      
      console.log('4. Response received:', res);
      console.log('5. Response data:', res.data);
      console.log('6. Token:', res.data?.token);
      console.log('7. User data:', res.data?.data);

      if (res.data?.token && res.data?.data) {
        console.log('8. Calling login...');
        login(res.data.token, res.data.data);
        console.log('9. Navigating to dashboard...');
        navigate('/dashboard');
      } else {
        console.error('Missing token or data in response');
        setError('Invalid response from server');
      }
      
    } catch (err) {
      console.error('=== ERROR DEBUG ===');
      console.error('Error object:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      console.error('Error response data:', err.response?.data);
      console.error('Error response status:', err.response?.status);
      console.error('Error request:', err.request);
      console.error('===================');

      setError(err.response?.data?.message || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-tag">// SIGNUP</span>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Join as a regular user</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>NAME</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
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
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>PASSWORD</label>
            <input
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="auth-error">⚠ {error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
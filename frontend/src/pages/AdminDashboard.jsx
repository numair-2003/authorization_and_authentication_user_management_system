// pages/AdminDashboard.jsx - Admin only

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsersAPI, deleteUserAPI, updateUserRoleAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user }              = useAuth();
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadUsers = async () => {
    try {
      const res = await getAllUsersAPI();
      setUsers(res.data.data);
    } catch {
      showToast('Failed to load users', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleDelete = async (id) => {
    if (id === user._id) {
      showToast("You can't delete yourself!", 'danger');
      return;
    }
    try {
      await deleteUserAPI(id);
      setUsers(users.filter((u) => u._id !== id));
      showToast('User deleted');
    } catch {
      showToast('Failed to delete user', 'danger');
    }
  };

  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRoleAPI(id, newRole);
      setUsers(users.map((u) => u._id === id ? { ...u, role: newRole } : u));
      showToast(`Role updated to ${newRole}`);
    } catch {
      showToast('Failed to update role', 'danger');
    }
  };

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-header">
          <span className="page-tag">// ADMIN PANEL</span>
          <h1 className="page-title">Control Center</h1>
          <p className="page-sub">Logged in as <strong>Administrator</strong> · {users.length} users total</p>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>JOINED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className={u._id === user._id ? 'current-user' : ''}>
                    <td>
                      <div className="user-avatar-name">
                        <span className="mini-avatar">{u.name.charAt(0).toUpperCase()}</span>
                        {u.name}
                        {u._id === user._id && <span className="you-badge">you</span>}
                      </div>
                    </td>
                    <td className="email-cell">{u.email}</td>
                    <td>
                      <span className={`role-tag role-${u.role}`}>{u.role}</span>
                    </td>
                    <td className="date-cell">
                      {new Date(u.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: '2-digit'
                      })}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-role"
                          onClick={() => handleRoleToggle(u._id, u.role)}
                          disabled={u._id === user._id}
                          title="Toggle role"
                        >
                          {u.role === 'admin' ? '→ user' : '→ admin'}
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(u._id)}
                          disabled={u._id === user._id}
                          title="Delete user"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

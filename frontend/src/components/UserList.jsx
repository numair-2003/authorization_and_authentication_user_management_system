import React from 'react';
import './UserList.css';

const UserList = ({ users, onDeleteUser, deletingId }) => {
  if (users.length === 0) {
    return (
      <div className="list-card">
        <div className="list-header">
          <span className="form-tag">// USER LIST</span>
          <h2 className="form-title">Records</h2>
        </div>
        <div className="empty-state">
          <span className="empty-icon">◌</span>
          <p>No users yet. Add one using the form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-card">
      <div className="list-header">
        <span className="form-tag">// USER LIST</span>
        <h2 className="form-title">Records</h2>
        <span className="user-count">{users.length}</span>
      </div>

      <ul className="user-list">
        {users.map((user, index) => (
          <li
            key={user._id}
            className="user-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>

            <div className="user-meta">
              <span className="user-date">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: '2-digit'
                })}
              </span>
              <button
                className="btn-delete"
                onClick={() => onDeleteUser(user._id)}
                disabled={deletingId === user._id}
                title="Delete user"
              >
                {deletingId === user._id ? '...' : '✕'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
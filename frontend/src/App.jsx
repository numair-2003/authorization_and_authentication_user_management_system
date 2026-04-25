import React, { useState, useEffect, useCallback } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { fetchUsers, createUser, deleteUser } from './services/api';
import './App.css';

const App = () => {
  const [users, setUsers]         = useState([]);
  const [adding, setAdding]       = useState(false);   
  const [deletingId, setDeletingId] = useState(null);  
  const [fetchError, setFetchError] = useState('');
  const [toast, setToast]         = useState(null);    

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadUsers = useCallback(async () => {
    try {
      setFetchError('');
      const res = await fetchUsers();
      setUsers(res.data.data);
    } catch {
      setFetchError('Could not connect to the backend. Make sure the server is running on port 5000.');
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleAddUser = async (userData) => {
    setAdding(true);
    try {
      const res = await createUser(userData);
      setUsers((prev) => [res.data.data, ...prev]);
      showToast(`${res.data.data.name} added successfully!`);
    } catch (err) {
      throw err;
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      showToast('User removed.', 'danger');
    } catch {
      showToast('Failed to delete user.', 'danger');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-bracket">[</span>
            MERN
            <span className="logo-bracket">]</span>
          </div>
          <p className="header-sub">User Management System</p>
        </div>
        <div className="stack-pills">
          {['MongoDB', 'Express', 'React', 'Node.js'].map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      </header>

      <main className="app-main">
        {fetchError && (
          <div className="banner-error">
            <span>⚠</span> {fetchError}
          </div>
        )}

        <div className="grid">
          <UserForm onAddUser={handleAddUser} loading={adding} />
          <UserList
            users={users}
            onDeleteUser={handleDeleteUser}
            deletingId={deletingId}
          />
        </div>
      </main>

      <footer className="app-footer">
        <code>GET /users · POST /users · DELETE /users/:id</code>
      </footer>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
        </div>
      )}
    </div>
  );
};

export default App;
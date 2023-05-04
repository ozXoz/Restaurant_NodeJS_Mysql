import React from 'react';
import api from '../services/api';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/logout',
        {},
        {
          headers: { 'x-access-token': token },
        }
      );
      onLogout();
    } catch (error) {
      console.error(error);
      alert('Failed to log out');
    }
  };

  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
    <button style={{ width: '100px', height: '50px', fontSize: '20px' }} onClick={handleLogout}>Logout</button>
    </div>
    );
}

export default Logout;

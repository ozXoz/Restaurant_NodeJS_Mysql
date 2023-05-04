import React, { useState } from 'react';
import api from '../services/api';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const navigate = useNavigate();




const validate = () => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one letter, one number, and minimum 8 characters

  let isValid = true;

  if (!emailRegex.test(email)) {
    setEmailError('Please enter a valid email address');
    isValid = false;
  } else {
    setEmailError('');
  }

  if (!passwordRegex.test(password)) {
    setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number');
    isValid = false;
  } else {
    setPasswordError('');
  }

  return isValid;
};


const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) {
    return;
  }

  try {
    const response = await api.post('/login', { email, password });
    onLogin(response.data.token);
    navigate('/employees/view');

  } catch (error) {
    console.error(error);
    alert('Failed to log in');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
  type="email"
  className={emailError ? 'invalid-input' : ''}
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
{emailError && <div className="error-message">{emailError}</div>}

<input
  type="password"
  className={passwordError ? 'invalid-input' : ''}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
{passwordError && <div className="error-message">{passwordError}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

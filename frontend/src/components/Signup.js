import React, { useState } from 'react';
import api from '../services/api';
import '../css/Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
const [usernameError, setUsernameError] = useState('');
const [passwordError, setPasswordError] = useState('');

const validate = () => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // At least 3 characters, can include letters, numbers, and underscores
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one letter, one number, and minimum 8 characters

  let isValid = true;

  if (!emailRegex.test(email)) {
    setEmailError('Please enter a valid email address');
    isValid = false;
  } else {
    setEmailError('');
  }

  if (!usernameRegex.test(username)) {
    setUsernameError('Username must be at least 3 characters long and can include letters, numbers, and underscores');
    isValid = false;
  } else {
    setUsernameError('');
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
    const response = await api.post('/signup', { email, password, username });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert('Failed to register user');
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
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
  type="text"
  className={usernameError ? 'invalid-input' : ''}
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
/>
{usernameError && <div className="error-message">{usernameError}</div>}

<input
  type="password"
  className={passwordError ? 'invalid-input' : ''}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
{passwordError && <div className="error-message">{passwordError}</div>}


      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;

import React from 'react';
import Signup from '../components/Signup';

const SignupPage = ({ onSuccess }) => {
  return (
    <div>
      <h1></h1>
      <Signup onSuccess={onSuccess} />
    </div>
  );
};

export default SignupPage;

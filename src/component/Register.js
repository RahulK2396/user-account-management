// Register.js
import React, { useState } from 'react';
import "../assets/CSS/Login.css"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Retrieve existing user data from localStorage
    const existingUserData = JSON.parse(localStorage.getItem('userArray')) || [];

    // Check if the email is already registered
    const isEmailRegistered = existingUserData.some((user) => user.email === email);

    if (isEmailRegistered) {
      setError('Email is already registered.');
      return;
    }

    // Add new user data to the existing array
    const updatedUserData = [
      ...existingUserData,
      {
        email,
        password,
      },
    ];

    // Store the updated array back in localStorage
    localStorage.setItem('userArray', JSON.stringify(updatedUserData));

    // Clear form fields and error message
    setEmail('');
    setPassword('');
    setError('');

    console.log('User registered:', { email, password });
  };

  return (
    <div className='login'>
      <h2>Registration Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <div className='input-field'> */}
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* </div> */}
      {/* <div className='input-field'> */}
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* </div> */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

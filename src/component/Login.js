
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/CSS/Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userArray')) || {};
    const user = storedUserData.find((u) => u.email === email && u.password === password);

    // Check if entered data matches data in localStorage
    console.log(storedUserData);
    if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        // Successfully logged in, navigate to the account page
        history('/account');
      } else {
        setError('Invalid email or password. Please try again.');
      }
  };

  return (
    <div className='login'>
      <h2>Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <div className='input-field'> */}
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* </div> */}
      {/* <div className='input-field'> */}
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* </div> */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;


import React, { useState, useEffect } from 'react';
import "../assets/CSS/Login.css"

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    email: '', // Initialize with an empty string
    password: '', // Initialize with an empty string
    // Add more fields as needed
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve user data array from localStorage when the component mounts
    const userArray = JSON.parse(localStorage.getItem('userArray')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];
    const currentUser = userArray.find((user) => user.email === loggedUser.email);

    if (currentUser) {
      setUserInfo(currentUser);
    }
  }, [userInfo.email]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Retrieve user data array from localStorage
    const userArray = JSON.parse(localStorage.getItem('userArray')) || [];

    // Update the user data with the edited values
    const updatedUserArray = userArray.map((user) => {
      if (user.email === userInfo.email) {
        return {
          ...user,
          email: userInfo.email, // If the email is edited, update it
          password: userInfo.password,
        };
      }
      return user;
    });

    // Store the updated user array back in localStorage
    localStorage.setItem('userArray', JSON.stringify(updatedUserArray));

    setEditMode(false);
  };

  const handleChange = (e) => {
    // Update the userInfo state when input values change
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='login'>
      <h2>Account Information</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Email: {userInfo.email}</p>
      <p>Password: {userInfo.password}</p>
      {/* Display more user information as needed */}

      {editMode ? (
        <>
          <label>Email:</label>
          <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
          {/* Add more input fields for other user information */}
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default Account;

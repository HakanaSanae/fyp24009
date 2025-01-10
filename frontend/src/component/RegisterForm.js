import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../interface/apiClient';

function RegistrationForm({setAccount}) {
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    confirmPassword: '',
    type: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if(!formData.username) {
      newErrors.username = 'Name cannot be empty.';
    } 

    if (!formData.email) {
      newErrors.email = 'Email address cannot be empty.';
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match.';
    } else if (formData.password.length < 8 || formData.password.length > 16 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = 'Password must be 8 to 16 characters long and contain both letters and numbers.';
    }

    if (!formData.type) {
      newErrors.type = 'Please select an account type.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const data = await apiClient.register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            type: formData.type
        }); 
        if (data.success) {
          localStorage.setItem('account', data.name);
            setAccount(data.name);
            console.log('Registration successful:', data);
        } else {
            console.error('Registration failed:', data.message);
        }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User/Company Name</label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <div>
          <label htmlFor="type">Account Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
              <option value="">Select Account Type</option>
              <option value="company">Company</option>
              <option value="individual">Indivdual</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? Click <a href="/login">here</a> to login.
      </p>
    </div>
    
  );
}

export default RegistrationForm;
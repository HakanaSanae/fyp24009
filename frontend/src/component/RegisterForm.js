import React, { useEffect, useState } from 'react';
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

  //make select element same size as the input fields
  useEffect(()=>{
    const select = document.querySelector('select');
    const input = document.querySelector('input');
    select.style.width = input.clientWidth + 'px';
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if(!formData.username) {
      newErrors.username = 'Name cannot be empty.';
    } 

    if (!formData.email) {
      newErrors.email = 'Email address cannot be empty.';
    } else {
      if (!formData.email.endsWith('.com') && !formData.email.endsWith('.hk')) {
        newErrors.email = 'Invalid email address.';
      }
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
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
        <div className = "form-item">
          <label>User/Company Name</label>
          <div className = "form-input-error-container">
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
          </div>
          
        </div>

        <div className = "form-item">
          <label>Email Address</label>
          <div className = "form-input-error-container">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
          
        </div>

        <div className = "form-item">
          <label>Password</label>
          <div className = "form-input-error-container">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
          
        </div>

        <div className = "form-item">
          <label>Confirm Password</label>
          <div className = "form-input-error-container">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
          </div>
          
        </div>

        <div className = "form-item">
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

        <div className = "form-item">
          <button type="submit">Register</button>
        </div>

      </form>
      <p>
        Already have an account? Click <a href="/login">here</a> to login.
      </p>
    </div>
    
  );
}

export default RegistrationForm;
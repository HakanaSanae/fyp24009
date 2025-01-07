import React, { useState } from 'react';

function RegistrationForm({setAccount}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Username validation
    if (formData.username.length < 4 || formData.username.length > 14 || formData.username.includes('@')) {
      newErrors.username = 'Username must be 4 to 14 characters long with no spaces or @ symbols.';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address cannot be empty.';
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match.';
    } else if (formData.password.length < 8 || formData.password.length > 16 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = 'Password must be 8 to 16 characters long and contain both letters and numbers.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      // Perform further actions like sending data to a server
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input
            type="text"
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

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? Click <a href="/login">here</a> to login.
      </p>
    </div>
    
  );
}

export default RegistrationForm;
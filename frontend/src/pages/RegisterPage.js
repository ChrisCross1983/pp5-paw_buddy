import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  console.log("RegisterPage loaded"); // Debugging
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/dj-rest-auth/registration/', formData);
      console.log('Registration successful:', response.data);
      navigate('/verification-sent');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(
        error.response?.data?.detail ||
        'An error occurred during registration. Please check your details and try again.'
      );
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="First Name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <FormInput
          label="Last Name"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

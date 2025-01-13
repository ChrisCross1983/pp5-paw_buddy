import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  console.log("LoginPage loaded"); // Debugging
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', formData);
      console.log('Login successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(
        error.response?.data?.non_field_errors?.[0] ||
        'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

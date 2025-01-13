import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    console.log("ErrorPage loaded"); // Debugging
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Something went wrong. Please try again.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;

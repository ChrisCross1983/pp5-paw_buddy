import React from 'react';
import { Link } from 'react-router-dom';

const VerificationSentPage = () => {
    console.log("VerificationSentPage loaded"); // Debugging
  return (
    <div className="verification-sent-page">
      <h1>Verification Email Sent</h1>
      <p>Please check your email for a verification link.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default VerificationSentPage;

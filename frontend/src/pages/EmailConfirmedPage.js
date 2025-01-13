import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailConfirmationPage = () => {
  console.log("EmailConfirmationPage loaded"); // Debugging
  const { key } = useParams();
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Key from useParams:", key);
    if (!key) {
      setStatus("error");
      return;
    }

    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/dj-rest-auth/registration/account-confirm-email/${key}/`
        );
        console.log("Response from backend:", response.data);
        setStatus("success");
      } catch (error) {
        console.error(
          "Error confirming email:",
          error.response?.data || error.message
        );
        setStatus("error");
      }
    };

    confirmEmail();
  }, [key]);

  return (
    <div className="email-confirmation-page">
      {status === "success" && <h1>Email successfully confirmed!</h1>}
      {status === "error" && <h1>Invalid or expired confirmation link.</h1>}
    </div>
  );
};

export default EmailConfirmationPage;

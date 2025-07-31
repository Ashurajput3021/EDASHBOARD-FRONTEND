import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setUser(null);
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate, setUser]);

  return (
    <div className="logout-page">
      <div className="logout-card">
        <h2>🔒 Logging Out...</h2>
        <p>You have been successfully logged out.</p>
        <p className="redirect-msg">Redirecting to login page...</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Logout;

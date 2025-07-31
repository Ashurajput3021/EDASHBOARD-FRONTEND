import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  }, [navigate]);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    if (result.auth && result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      setUser(result.user);
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <h1 className="h2">Login</h1>
      <input className="inputbox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="inputbox" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="appButton">Login</button>
    </div>
  );
};

export default Login;

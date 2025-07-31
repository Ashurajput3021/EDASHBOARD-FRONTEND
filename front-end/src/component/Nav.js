import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/logout");
  };

  return (
    <div>
      <img alt="logo" src="./images/logo.jpg.png" className="logo" />
      {user ? (
        <ul className="nav-ul">
          <li><Link to="/">Product</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <button onClick={logout} className="logout-btn">
              Logout ({user.name})
            </button>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;

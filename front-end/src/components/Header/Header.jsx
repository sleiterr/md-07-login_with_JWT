import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  <header>
    <nav className="w-full flex items-center justify-center">
      <ul className="flex items-center justify-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/backoffice"> Backoffice</Link>
            </li>
            <li>
              <Link to="/Logout" onClick={handleLogout}>
                {" "}
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li className="cursor-pointer">
            <Link to="/Login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  </header>;
};

export default Header;

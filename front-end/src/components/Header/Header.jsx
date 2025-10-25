import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Header = ({ token, onLogout }) => {
  const navigate = useNavigate();

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("invalid token:", err);
    }
  }

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="w-full flex items-center justify-center">
        <ul className="flex items-center justify-center">
          <li>
            <Link
              to="/"
              onClick={onLogout}
              className="font-normal text-zinc-800 text-xl"
            >
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link
                  to="/backoffice"
                  className="font-normal text-zinc-800 text-xl"
                >
                  Backoffice
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  to="/Logout"
                  className="font-normal text-zinc-800 text-xl"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="cursor-pointer">
              <Link to="/Login" className="font-normal text-zinc-800 text-xl">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user && (
        <div className="text-sm text-gray-700 mt-2">
          Logged in as : <span className="font-semibold">{user.email}</span>(
          {user.role})
        </div>
      )}
    </header>
  );
};

export default Header;

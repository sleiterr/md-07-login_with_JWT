import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="w-full flex items-center justify-center">
        <ul className="flex items-center justify-center">
          <li>
            <Link to="/" className="font-normal text-zinc-800 text-xl">
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
              <li className="cursor-pointer">
                <Link to="/Login" className="font-normal text-zinc-800 text-xl">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                to="/Logout"
                className="font-normal text-zinc-800 text-xl"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

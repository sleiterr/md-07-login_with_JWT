import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import clsx from "clsx";

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
        <ul className="flex items-center justify-center gap-8">
          <li className="pt-4 pb-2">
            <Link
              to="/"
              onClick={onLogout}
              className={clsx(
                "relative font-normal text-zinc-800 text-2xl",
                "before:content[''] before:absolute before:w-0 before:h-[2px] before:rounded-xs before:bg-stone-950 before:bottom-[-.25rem] before:left-0 before:transition-all before:duration-300 hover:before:w-full"
              )}
            >
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li className="pt-4 pb-2">
                <Link
                  to="/backoffice"
                  className={clsx(
                    "relative font-normal text-zinc-800 text-2xl",
                    "before:content[''] before:absolute before:w-0 before:h-[2px] before:rounded-xs before:bg-stone-950 before:bottom-[-.25rem] before:left-0 before:transition-all before:duration-300 hover:before:w-full"
                  )}
                >
                  Backoffice
                </Link>
              </li>
              <li className="pt-4 pb-2">
                <button
                  onClick={handleLogout}
                  to="/Logout"
                  className={clsx(
                    "relative font-normal text-zinc-800 text-2xl px-2 py-1 cursor-pointer",
                    "before:content-[''] before:absolute before:inset-0 before:bg-red-500 before:rounded-sm before:opacity-0 before:transition-opacity before:duration-300 before:-z-10",
                    "hover:before:opacity-100 hover:text-white"
                  )}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="pt-4 pb-2 cursor-pointer">
              <Link
                to="/Login"
                className={clsx(
                  "relative font-normal text-zinc-800 text-2xl px-2 py-1",
                  "before:content-[''] before:absolute before:inset-0 before:bg-indigo-500 before:rounded-sm before:opacity-0 before:transition-opacity before:duration-300 before:-z-10",
                  "hover:before:opacity-100 hover:text-white"
                )}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user && (
        <div className="font-nomal text-sm text-gray-700 py-2 ml-12">
          Logged in as :{" "}
          <span className="font-semibold text-gray-700">{user.email}</span>(
          {user.role})
        </div>
      )}
    </header>
  );
};

export default Header;

import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Get token from localStorage (saved after login)
  const [token] = useLocalStorage("token", null);

  //! If there is no token → user is not logged in → redirect to login page
  if (!token) return <Navigate to="/login" replace />;

  let user;
  try {
    // Decode JWT token to extract user info (id, email, role, etc.)
    user = jwtDecode(token);
  } catch {
    // If token is invalid or cannot be decoded → redirect to login
    return <Navigate to="/login" replace />;
  }
  // Check if this route is restricted to specific roles
  // allowedRoles is an array, e.g. ["admin", "editor"]
  // If the user’s role is not in that array → deny access and redirect
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

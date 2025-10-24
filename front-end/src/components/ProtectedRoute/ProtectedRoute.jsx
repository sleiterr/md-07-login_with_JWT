import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ childern, allowedRoles }) => {
  const [token] = useLocalStorage("token", null);

  if (!token) return <Navigate to="/login" replace />;

  let user;
  try {
    user = jwtDecode(token);
  } catch {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return childern;
};

export default ProtectedRoute;

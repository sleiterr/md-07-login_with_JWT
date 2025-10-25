import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

const Backoffice = () => {
  const [token] = useLocalStorage("token", null);
  let userRole = null;

  if (token) {
    const user = jwtDecode(token);
    userRole = user.role;
  }

  return (
    <div>
      <h2>Backoffice</h2>
      {userRole === "admin" && <Link to="/admin">Go to Admin Panel</Link>}
    </div>
  );
};

export default Backoffice;

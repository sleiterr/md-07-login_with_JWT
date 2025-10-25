import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h2>Access Denied</h2>
      <p>You don’t have permission to view this page.</p>
      <Link to="/profile">Go back to profile</Link>
    </div>
  );
};

export default Unauthorized;

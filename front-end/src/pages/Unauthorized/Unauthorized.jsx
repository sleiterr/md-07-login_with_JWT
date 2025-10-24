import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Access Denied</h2>
      <p>You don’t have permission to view this page.</p>
      <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to login
      </Link>
    </div>
  );
};

export default Unauthorized;

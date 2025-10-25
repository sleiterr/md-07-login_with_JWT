import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <h2>AdminPanel</h2>
      <Link to="/backoffice">Go to Backoffice</Link>
    </div>
  );
};

export default AdminPanel;

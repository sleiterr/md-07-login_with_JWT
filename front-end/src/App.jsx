import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profil/Profile";
import Backoffice from "./pages/Backoffice/Backoffice";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
// Hook for localStorage state management
import { useLocalStorage } from "@uidotdev/usehooks";
// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Token state synced with localStorage
  const [token, setToken] = useLocalStorage("token", null);

  // Function to handle login → store new token
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  // Function to handle logout → clear token
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      {/* Header component with token and logout functionality */}
      <Header token={token} onLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes (role-based access control) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "editor", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/backoffice"
          element={
            <ProtectedRoute allowedRoles={["editor", "admin"]}>
              <Backoffice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        {/* Duplicate login route (optional, can be removed) */}
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Toast notifications container */}
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}

export default App;

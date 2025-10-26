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
import { useLocalStorage } from "@uidotdev/usehooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useLocalStorage("token", null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
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
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}

export default App;

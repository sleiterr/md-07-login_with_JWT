import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profil/Profile";
import Backoffice from "./pages/Backoffice/Backoffice";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [token] = useLocalStorage("token", null);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/profile" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </>
  );
}

export default App;

import React, { useState } from "react";
import jwtDecode from "jwt-decode"; // Library to decode JWT tokens
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { toast } from "react-toastify"; // Toast notifications
import clsx from "clsx";

const API_URL = import.meta.env.VITE_API_BASE_URL; // Backend API base URL from environment variables
console.log(API_URL);

const Login = ({ onLogin }) => {
  // Local state for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload

    try {
      // Send login request to backend
      console.log("API_URL:", API_URL);
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await res.json(); // Parse JSON response

      if (res.ok) {
        // If login successful
        toast.success("Login was successful");
        onLogin(data.token); // Pass token to parent component (App.jsx) to store in localStorage

        const user = jwtDecode(data.token); // Decode JWT to get user info (id, email, role)

        // Redirect user based on role
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "editor") navigate("/backoffice");
        else navigate("/profile");
      } else {
        // If login failed (wrong credentials)
        toast.error(data.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during login");
    }
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <h2 className="font-bold text-5xl text-center text-zinc-800 mb-8">
          Sign
        </h2>
        <div className="bg-zinc-200 px-18 py-8 rounded-xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={clsx(
                "block w-xs rounded-lg border border-black/20 bg-white px-4 py-2 text-sm text-zink-400",
                "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0",
                "transition-all duration-300"
              )}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={clsx(
                "block w-xs rounded-lg border border-black/20 bg-white px-4 py-2 text-sm text-zink-400",
                "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0",
                "transition-all duration-300"
              )}
            />
            <button
              type="submit"
              className={clsx(
                "rounded bg-sky-600 px-4 py-2 text-sm text-white",
                "active:bg-sky-700 hover:bg-sky-500 cursor-pointer transition duration-300"
              )}
            >
              Log ind
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

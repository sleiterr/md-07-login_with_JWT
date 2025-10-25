import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login was successful");
        onLogin(data.token);

        const user = jwtDecode(data.token);

        if (user.role === "admin") navigate("/admin");
        else if (user.role === "editor") navigate("/backoffice");
        else navigate("/profile");
      } else {
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
        <div className="bg-zinc-200 px-18 py-8 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="cursor-pointer">
              Log ind
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

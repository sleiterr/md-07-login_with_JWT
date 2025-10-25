import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useLocalStorage("token", null);
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
        setToken(data.token);

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
    <>
      <form onSubmit={handleSubmit}>
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
    </>
  );
};

export default Login;

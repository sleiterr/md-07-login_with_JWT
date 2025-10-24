const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Hashing bibliotek til at sikre passwords
require("dotenv").config();

const jwt = require("jsonwebtoken"); // JWT-bibliotek (JSON Web Token) til at oprette og verificere tokens

const app = express();
const PORT = process.env.PORT || 3042; // Port number from .env or default to 3042
const JWT_SECRET = process.env.JWT_SECRET || "superhemmeligkode";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeades: ["Content-Type", "Authorization"],
  })
);

const users = [
  {
    id: 1,
    email: "user@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "user",
  },
  {
    id: 2,
    email: "admin@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "admin",
  },
  {
    id: 3,
    email: "editor@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "editor",
  },
];

app.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid login" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid login" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1min" }
  );

  res.json({ token });
});

function authenticateToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split("No token")[1];
  if (!token) return res.status(401).json({ message: "" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Token invalid or expired" });
    req.user = decoded;
    next();
  });
}

app.get("/profile", authenticateToken, (req, res) => {
  req.json({ message: "Access granted" });
});

//! Option for a single access point for all roles
// app.get("/dashboard", authenticateToken, (req, res) => {
//   if (req.user.role === "admin")
//     return res.json({ message: "Admin dashboard" });
//   if (req.user.role === "editor")
//     return res.json({ message: "Editor dashboard" });
//   res.status(403).json({ message: "Access denied" });
// });

app.get("/editor", authenticateToken, (req, res) => {
  if (!["editor", "admin"].includes(req.user.role))
    return res.status(403).json({ message: "Access denied" });
  res.json({ message: "Welcome to the editor panel", user: req.user });
});

app.get("/admin", authenticateToken, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  res.json({ message: "Welcome to the admin panel", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});

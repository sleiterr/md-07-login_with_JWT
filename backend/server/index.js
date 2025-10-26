const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Hashing bibliotek til at sikre passwords
require("dotenv").config(); // Loads environment variables from a .env file into process.env

const jwt = require("jsonwebtoken"); // JWT-bibliotek (JSON Web Token) til at oprette og verificere tokens

const app = express(); // Creates an Express application instance
const PORT = process.env.PORT || 3042; // Port number from .env or default to 3042
const JWT_SECRET = process.env.JWT_SECRET || "superhemmeligkode"; // Secret key for signing JWT tokens

// Middleware setup
app.use(express.json()); // Allows Express to parse incoming JSON requests (req.body)

// Enable CORS (Cross-Origin Resource Sharing)
// This allows the frontend (running on localhost:5173) to communicate with this backend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const users = [
  {
    id: 1, //Profile
    email: "user@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "user",
  },
  {
    id: 2, //Admin
    email: "admin@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "admin",
  },
  {
    id: 3, //backoffice
    email: "editor@email.com",
    password: bcrypt.hashSync("1234", 10),
    role: "editor",
  },
];

// Route for user login (Sign In)
app.post("/auth/signin", async (req, res) => {
  // Extract email and password from the request body (sent by the frontend)
  const { email, password } = req.body;

  // Find the user in the array based on the email
  const user = users.find((u) => u.email === email);

  // If user not found, send 401 Unauthorized
  if (!user) return res.status(401).json({ message: "Invalid login" });

  // Compare the entered password with the hashed password stored in the user object
  const valid = await bcrypt.compare(password, user.password);

  // If password doesn’t match, again send 401 Unauthorized
  if (!valid) return res.status(401).json({ message: "Invalid login" });

  // If both checks pass, create a signed JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // payload (data encoded in token)
    JWT_SECRET, // secret key for signing
    { expiresIn: "1min" } // token lifetime (expires after 1 minute)
  );

  // Send the token back to the frontend as a JSON response
  res.json({ token });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res) {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Extract token from the header
  const token = authHeader && authHeader.split(" ")[1];
  // If no token provided → respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: "" });

  // Verify the token using jwt.verify(), jsonwebtoken
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    // If token is invalid or expired → respond with 401
    if (err)
      return res.status(401).json({ message: "Token invalid or expired" });
    // Attach decoded token data to req.user
    req.user = decoded;

    // Call next() to continue to the actual route handler
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

// Route for editor panel (accessible to editor and admin roles)
app.get("/editor", authenticateToken, (req, res) => {
  // Check if user's role is NOT in allowed roles
  // If role is not "editor" or "admin", deny access
  if (!["editor", "admin"].includes(req.user.role))
    return res.status(403).json({ message: "Access denied" });

  // If role is allowed, return welcome message with user info
  res.json({ message: "Welcome to the editor panel", user: req.user });
});

//Route for admin panel (accessible only to admin role)
app.get("/admin", authenticateToken, (req, res) => {
  // Check if user's role is not "admin"
  // If role is not "admin", deny access
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  // If role is admin, return welcome message with user info
  res.json({ message: "Welcome to the admin panel", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});

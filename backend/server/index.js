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



app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});

## Mini Fullstack JWT Login Project

This project is a fullstack login system with role-based protected pages, built using React on the frontend and Express + JWT + bcrypt on the backend. It demonstrates authentication flows, token handling, and protected routes.

## Features

Login and Logout

JWT token authentication stored in localStorage

Protected routes for Profile, Backoffice, and AdminPanel

Role-based access control (user, editor, admin)

Password hashing with bcrypt

Toast notifications for login success/failure

Simple navigation via Header component

## Frontend:

Main packages used:

react, react-dom – core React libraries

react-router-dom – routing and protected routes

jwt-decode – decode JWT to get user role

@uidotdev/usehooks – useLocalStorage hook for token handling

react-toastify – toast notifications

tailwindcss – styling

## Structure:

src/
├── App.jsx
├── components/
│   └── Header/
│       └── Header.jsx
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Profil/
│   ├── Backoffice/
│   ├── AdminPanel/
│   └── Unauthorized/


## Notes:

Header.jsx displays links based on the token and user role.

ProtectedRoute.jsx restricts access based on role and token validity.

Login.jsx handles login and saves JWT to localStorage.

Backend

Main packages used:

express – server framework

cors – cross-origin requests

bcryptjs – password hashing

jsonwebtoken – create and verify JWT

dotenv – environment variables

## Notes:

Users are stored in-memory for demo purposes:

const users = [
  { id: 1, email: "user@email.com", password: "...", role: "user" },
  { id: 2, email: "admin@email.com", password: "...", role: "admin" },
  { id: 3, email: "editor@email.com", password: "...", role: "editor" },
];


Login endpoint: POST /auth/signin

Protected endpoints: /profile, /editor, /admin

JWT expires in 1 minute (for demo/testing purposes)

Getting Started

## Backend

Navigate to the backend folder

Install dependencies:

npm install

Start the server:

node server/index.js


Server runs on http://localhost:3042.

## Frontend

Navigate to the frontend folder

Install dependencies:

npm install


Start the frontend:

npm run dev


Frontend runs on http://localhost:5173.

## Test Users

## You can log in using the following credentials:

_________________________________________________________________
Email	            Password	    Role	    Pages Accessible
-----------------------------------------------------------------
user@email.com        1234	        user	        Profile
-----------------------------------------------------------------
editor@email.com      1234	        editor	        Backoffice
-----------------------------------------------------------------
admin@email.com       1234	         admin	        AdminPanel,
                                                    Backoffice, 
                                                    Profile
_________________________________________________________________

## Usage

Login with one of the test users

Access protected pages based on role

Logout clears the token from localStorage and redirects to /login

Toast notifications show login success or failure

Notes / Next Steps

Refresh token system is optional and not implemented

Styling is minimal and done via TailwindCSS

For production, move users to a database (e.g., MongoDB) instead of in-memory
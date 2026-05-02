# MERN Auth — JWT + Role-Based Access Control
### Internship Week 2 Project — DawoodTech NextGen

A full-stack authentication system built with **MongoDB · Express.js · React · Node.js**


## Live Demo

| | URL |
|---|---|
| **Frontend** | *(deploy to Vercel and add URL here)* |
| **Backend API** | *(deploy to Railway and add URL here)* |


## Authentication Flow

```
User Signup
    │
    ▼
POST /api/auth/signup
    │  → Validate input
    │  → Hash password with bcrypt
    │  → Save user to MongoDB
    │  → Generate JWT token
    ▼
Return token + user data
    │
    ▼
Frontend stores token in localStorage
    │
    ▼
Every API request sends: Authorization: Bearer <token>
    │
    ▼
authMiddleware verifies token
    │
    ├─ Valid token → attach user to req.user → next()
    └─ Invalid token → 401 Unauthorized
```


## Roles

| Role | Access |
|------|--------|
| **user** | View profile, update profile, user dashboard |
| **admin** | All user access + admin panel, manage all users, change roles, delete users |

> New signups are always assigned the `user` role. Admin role must be set manually in the database or via the admin panel.


## Project Structure

```
project-root/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       -> signup, login, getMe
│   │   ├── userController.js       -> getProfile, updateProfile
│   │   └── adminController.js      -> getAllUsers, deleteUser, updateRole
│   ├── middleware/
│   │   └── authMiddleware.js       -> protect (JWT verify) + authorize (role check)
│   ├── models/
│   │   └── User.js                 -> name, email, password (hashed), role
│   ├── routes/
│   │   ├── authRoutes.js           -> /api/auth/*
│   │   ├── userRoutes.js           -> /api/user/*
│   │   └── adminRoutes.js          -> /api/admin/*
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx     -> Global auth state
│   │   ├── components/
│   │   │   ├── Navbar.jsx          -> Navigation with role-aware links
│   │   │   └── ProtectedRoute.jsx  -> Redirect unauthenticated users
│   │   ├── pages/
│   │   │   ├── Home.jsx         → Landing page
│   │   │   ├── Login.jsx        → Login form
│   │   │   ├── Signup.jsx       → Signup form
│   │   │   ├── Dashboard.jsx    → User dashboard
│   │   │   ├── AdminDashboard.jsx → Admin panel
│   │   │   └── Profile.jsx      → Update profile
│   │   ├── services/
│   │   │   └── api.js           → Axios with JWT interceptor
│   │   ├── App.jsx              → Routes
│   │   └── index.js
│   └── package.json
│
└── README.md
```


## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/me` | Protected | Get current user |

### User Routes (`/api/user`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/user/profile` | Protected | Get profile |
| PUT | `/api/user/profile` | Protected | Update profile |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin only | Get all users |
| DELETE | `/api/admin/users/:id` | Admin only | Delete user |
| PUT | `/api/admin/users/:id/role` | Admin only | Update user role |


## Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd project-root
```

### 2. Backend

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

Run:
```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```


## Creating an Admin User

After signup, you can promote a user to admin two ways:

**Option 1 — MongoDB Compass:**
Find the user → change `role` field from `"user"` to `"admin"` → Save

**Option 2 — Admin Panel:**
Login as an existing admin → go to Admin Panel → click `→ admin` next to any user


## Deployment

### Backend → Railway
Add these environment variables:
- `MONGO_URI` → MongoDB Atlas connection string
- `JWT_SECRET` → any long random string
- `JWT_EXPIRES_IN` → `7d`

### Frontend → Vercel
Add environment variable:
- `REACT_APP_API_URL` → your Railway backend URL


## Security Features

- Passwords hashed with **bcrypt** (salt rounds: 10)
- JWT tokens expire after **7 days**
- Password field never returned in API responses (`select: false`)
- Role escalation blocked on signup (users can't self-assign admin)
- Protected routes redirect unauthenticated users to `/login`
- Admin routes blocked for non-admin users (403 Forbidden)


*Built by **Numair Fahad** — MERN Stack Intern at DawoodTech NextGen*
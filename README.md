# MERN Auth — JWT + Role-Based Access Control
### Internship Week 2 Project — DawoodTech NextGen

A full-stack authentication system built with **MongoDB · Express.js · React · Node.js**

## Live Demo

| | URL |
|---|---|
| **Frontend** | https://authorization-and-authentication-us.vercel.app |
| **Backend API** | https://authorizationandauthenticationusermanagement-production.up.railway.app/ |

> **Note:** The backend is hosted on Railway's free tier and may take 10–15 seconds to wake up after a period of inactivity. Simply refresh if the page doesn't load immediately.


## Deployment Stack

| Service | Platform | Purpose |
|---------|----------|---------|
| Frontend | [Vercel](https://vercel.com) | Hosts the React app |
| Backend | [Railway](https://railway.app) | Runs the Node/Express server |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud-hosted MongoDB -> stores data |


## Authentication Flow

```
User Signup
    │
    ▼
POST /api/auth/signup
    │  -> Validate input
    │  -> Hash password with bcrypt
    │  -> Save user to MongoDB
    │  -> Generate JWT token
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
    ├─ Valid token → attach user to req.user -> next()
    └─ Invalid token -> 401 Unauthorized
```


## Roles

| Role | Access |
|------|--------|
| **user** | View profile, update profile, user dashboard |
| **admin** | All user access + admin panel, manage all users, change roles, delete users |

> New signups are always assigned the `user` role by default. Admin role must be set manually in MongoDB Compass or via the Admin Panel by an existing admin.


## Project Structure

```
project-root/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      -> signup, login, getMe
│   │   ├── userController.js      -> getProfile, updateProfile
│   │   └── adminController.js     -> getAllUsers, deleteUser, updateRole
│   ├── middleware/
│   │   └── authMiddleware.js      -> protect (JWT verify) + authorize (role check)
│   ├── models/
│   │   └── User.js                -> name, email, password (hashed), role
│   ├── routes/
│   │   ├── authRoutes.js          -> /api/auth/*
│   │   ├── userRoutes.js          -> /api/user/*
│   │   └── adminRoutes.js         -> /api/admin/*
│   ├── .env                       -> Environment variables
│   ├── package.json
│   └── server.js                  -> Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx    -> Global auth state (login, logout, user)
│   │   ├── components/
│   │   │   ├── Navbar.jsx         -> Role-aware navigation bar
│   │   │   ├── Navbar.css
│   │   │   └── ProtectedRoute.jsx -> Redirects unauthenticated users
│   │   ├── pages/
│   │   │   ├── Home.jsx           -> Landing page
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx          -> Login form
│   │   │   ├── Signup.jsx         -> Signup form
│   │   │   ├── Auth.css           -> Shared login/signup styles
│   │   │   ├── Dashboard.jsx      -> User dashboard
│   │   │   ├── Dashboard.css
│   │   │   ├── AdminDashboard.jsx -> Admin panel (manage all users)
│   │   │   ├── AdminDashboard.css
│   │   │   ├── Profile.jsx        -> Update profile page
│   │   │   └── Profile.css
│   │   ├── services/
│   │   │   └── api.js             -> Axios with JWT interceptor
│   │   ├── App.jsx                -> Route definitions
│   │   ├── index.js               -> React entry point
│   │   └── index.css              -> Global styles + CSS variables
│   └── package.json
│
├── MERN_API_Tests.postman_collection.json
└── README.md
```


## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | Protected | Get current logged in user |

### User Routes (`/api/user`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/user/profile` | Protected | Get user profile |
| PUT | `/api/user/profile` | Protected | Update user profile |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin only | Get all users |
| DELETE | `/api/admin/users/:id` | Admin only | Delete a user |
| PUT | `/api/admin/users/:id/role` | Admin only | Update user role |


## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/numair-2003/authorization_and_authentication_user_management_system.git
cd authorization_and_authentication_user_management_system
```

### 2. Start MongoDB Locally

```bash
# Windows
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "D:\MongoDB\data\db"
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=7d
```

Run:
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:5000
```

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

React app opens at: **http://localhost:3000**


## Creating an Admin User

After signing up, promote a user to admin in two ways:

**Option 1 — MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Go to `mern_auth` database -> `users` collection
4. Find your user -> click Edit
5. Change `role` from `"user"` to `"admin"`
6. Click Update
7. Logout and login again

**Option 2 — MongoDB Compass (Production/Cloud Atlas):**
1. Log in to **MongoDB Atlas** and navigate to your Cluster
2. Click **Connect** and select **Connect using MongoDB Compass**
3. Copy the provided URI string
4. Open **MongoDB Compass**, paste the URI, and replace `<password>` with your database user password
5. Open the `mern_auth` -> `users` collection and update the user role to `"admin"`

> **Note:** When setting your Database User password in MongoDB Cloud Atlas, avoid using special symbols (like `@`, `:`, `/`, or `#`). These characters have special meanings in URIs and can cause connection failures in MongoDB Compass or Railway App. Always use alphanumeric characters for the best results.

**Option 3 — Admin Panel:**
Login as an existing admin -> go to Admin Panel -> click `-> admin` next to any user.


## Deployment Guide

### Backend -> Railway

1. Set the **Root Directory** to `/backend` in Railway settings
2. Ensure the **Custom Build Command** is empty (to skip unnecessary `npm run build` checks)
3. Add Environment Variables:
   - `MONGO_URI`: `mongodb+srv://numair1919_db_user:IS6gghxC4MEVwsQg@cluster0.k0ber2d.mongodb.net/mern_auth?appName=Cluster0` (Ensure there are no whitespaces spaces in URI)
   - `JWT_SECRET`: `supersecretkey123`
   - `PORT`: `5000`

### Frontend -> Vercel

Add an environment variable in Vercel dashboard:
- `REACT_APP_API_URL` -> `https://authorizationandauthenticationusermanagement-production.up.railway.app` (Ensure `https://` prefix is included)


## Security Features

- Passwords hashed with **bcrypt** (salt rounds: 10)
- JWT tokens expire after **7 days**
- Password field never returned in API responses (`select: false`)
- Role escalation blocked on signup (users cannot self-assign admin)
- Protected routes redirect unauthenticated users to `/login`
- Admin routes return **403 Forbidden** error for non-admin users
- JWT verified on every protected request via middleware

*Built by **Numair Fahad** — MERN Stack Intern at DawoodTech NextGen*
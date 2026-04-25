# MERN User Management App
### Internship Week 1 Project

A full-stack CRUD application built with **MongoDB · Express.js · React · Node.js**


## Project Structure

project-root/
├── backend/
│   ├── controllers/
│   │   └── userController.js   -> Business logic (GET, POST, DELETE)
│   ├── models/
│   │   └── User.js             -> Mongoose schema (name, email)
│   ├── routes/
│   │   └── userRoutes.js       -> Express route definitions
│   ├── .env                    -> Environment variables (PORT, MONGO_URI)
│   ├── package.json
│   └── server.js               -> Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserForm.jsx    -> Add user form
│   │   │   ├── UserForm.css
│   │   │   ├── UserList.jsx    -> Display & delete users
│   │   │   └── UserList.css
│   │   ├── services/
│   │   │   └── api.js          -> Axios API calls
│   │   ├── App.jsx             -> Root component + state management
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── MERN_API_Tests.postman_collection.json
└── README.md


## Prerequisites

Make sure the following are installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| MongoDB | 6+ | https://www.mongodb.com/try/download/community |
| MongoDB Compass | Latest | https://www.mongodb.com/products/compass |
| VS Code | Latest | https://code.visualstudio.com |
| Postman | Latest | https://www.postman.com/downloads |


## Setup and Running

### 1. Start MongoDB

Make sure your local MongoDB server is running:
```bash
# macOS/Linux
mongod

# Windows (if installed as a service, it may already be running)
# Open MongoDB Compass and connect to: mongodb://localhost:27017
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev         # uses nodemon for auto-reload
# OR
npm start           # plain node
```

You should see:
   1. Connected to MongoDB
   2. Server running at http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

React app opens at: **http://localhost:3000**


## API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/users` | Fetch all users | — |
| POST | `/users` | Create new user | `{ "name": "...", "email": "..." }` |
| DELETE | `/users/:id` | Delete user by ID | — |


### Example Responses

**GET /users**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "657f...",
      "name": "Alice",
      "email": "alice@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**POST /users**
```json
// Request body
{ "name": "Alice", "email": "alice@example.com" }

// Response 201
{ "success": true, "message": "User created successfully!", "data": { ... } }
```

**DELETE /users/:id**
```json
// Response 200
{ "success": true, "message": "User deleted successfully!", "data": { ... } }
```


## Postman API Testing

1. Open **Postman**
2. Click **Import** → upload `MERN_API_Tests.postman_collection.json`
3. The collection includes 6 pre-built requests:
   - Health Check (GET /)
   - GET All Users
   - POST Create User
   - DELETE User by ID
   - POST Missing Email (validation test)
   - DELETE Invalid ID (error handling test)

> **Tip:** Run POST first to add a user, then copy the `_id` from the response and paste it into the DELETE request URL.


## Frontend Features

- **Add User Form** — Name + email inputs with client-side validation
- **User List** — Displays all users with avatar initials, name, email, date added
- **Delete** — Removes user instantly from UI and database
- **Toast Notifications** — Success/error feedback
- **Error Banner** — Shows if backend is unreachable
- **Responsive Design** — Works on mobile and desktop


## GitHub Upload

- /backend folder with all files
- /frontend folder with all files
- .gitignore (exclude node_modules and .env)
- README.md
- Postman collection


**Create a `.gitignore`:**

- node_modules/
- .env
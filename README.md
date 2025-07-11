# MERN Blog Backend

This is the backend API for a simple blog platform built with **MongoDB**, **Express.js**, and **Node.js**. It provides user authentication (with JWT) and CRUD operations for blog posts.

---
> Deployed Link: https://forus-electric-backend.onrender.com/
## Features

- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Create, Read, Update, Delete (CRUD) for Blog Posts
- ✅ Route protection using middleware
- ✅ Input validation handled in controllers

---

## Folder Structure

```
backend/
├── config/           # MongoDB connection setup
│   └── db.js
├── controllers/      # Business logic
│   ├── authController.js
│   └── postController.js
├── middleware/       # Auth middleware
│   └── authMiddleware.js
├── models/           # Mongoose models (User, Post)
│   ├── User.js
│   └── Post.js
├── routes/           # API endpoints
│   ├── authRoutes.js
│   └── postRoutes.js
├── .env              # Environment variables
├── index.js         # Entry point
├── package.json
```

---

## Installation

```bash
# 1. Clone the repo
git clone <repository_link>
cd forus-electric-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```

---

## .env File Format

Create a `.env` file in the root with the following content:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/blogApp
JWT_SECRET=your_jwt_secret_here
```

---

## Running the Server

```bash
# Run with nodemon (recommended)
nodemon index.js


Server will start at:
http://localhost:8000

---

## API Endpoints

### Auth Routes

| Method | Route              | Description         |
|--------|--------------------|---------------------|
| POST   | /api/auth/register | Register new user   |
| POST   | /api/auth/login    | Login & receive JWT |

---

### Blog Post Routes (Protected)

Send JWT token in the header like this:

```
Authorization: Bearer <your_token>
```

| Method | Route            | Description          |
|--------|------------------|----------------------|
| POST   | /api/posts       | Create a new post    |
| GET    | /api/posts       | Get user's posts     |
| PATCH  | /api/posts/:id   | Update a post        |
| DELETE | /api/posts/:id   | Delete a post        |

Blog Post fields: `title`, `content`, `tags`

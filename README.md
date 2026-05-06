# MERN Task Manager

A production-ready task manager built with MongoDB, Express, React, and Node.js. The backend uses JWT authentication, task ownership, centralized error handling, and rate limiting. The frontend uses React Router, Context API, Axios, and Tailwind CSS.

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, express-rate-limit, helmet, rate-limit-redis, redis

## Project Structure

### Backend

- src/controllers
- src/models
- src/routes
- src/middleware
- src/config
- src/utils


### Setup Backend

```bash
cd todo-backend
npm install
```

Create a `.env` file in `backend/` from `.env.example` and set your values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_super_secret_value
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```


## API Endpoints

### Auth

- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login and receive a JWT
- `GET /api/auth/me` - Get the authenticated user

### Tasks

- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Notes

- Passwords are hashed with bcrypt before storage.
- JWT is stored in `localStorage` for the frontend session.
- Every task is scoped to the authenticated user.
- The backend includes centralized error handling and rate limiting.

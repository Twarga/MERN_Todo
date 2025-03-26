# 📝 Todo App

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen)
![Node](https://img.shields.io/badge/Node-v16%2B-darkgreen)
![React](https://img.shields.io/badge/React-v19.0.0-61DAFB)
![Express](https://img.shields.io/badge/Express-v4.21.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.12.2-success)
![Status](https://img.shields.io/badge/Status-Active-success)
![Last Commit](https://img.shields.io/badge/Last%20Commit-March%202025-yellow)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing your todos with user authentication, priority levels, categories, and statistics tracking.

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Todo Management**: Create, read, update, and delete todos
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Categories**: Organize todos by work, personal, shopping, or other categories
- **Due Dates**: Set and track due dates for your todos
- **Dashboard**: View statistics about your todos, including completion rates
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Tech Stack

### Frontend
- React 19
- React Router 6
- Axios for API requests
- CSS with support for Tailwind CSS

### Backend
- Node.js with Express
- MongoDB with Mongoose ORM
- JWT for authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### Setup Environment Variables

Create a `.env` file in the server directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
PORT=5000
```

### Install Dependencies & Run

#### Backend

```bash
cd server
npm install
npm run dev
```

The server will run on http://localhost:5000

#### Frontend

```bash
cd client
npm install
npm start
```

The client will run on http://localhost:3000

## 🏗️ Project Structure

```
todo-app/
├── client/                # React frontend
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # UI components
│       ├── context/       # React context providers
│       ├── pages/         # App pages
│       └── services/      # API services
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   └── routes/            # API routes
```

## 📱 Application Flow

1. **Authentication**: Users register or login to access the app
2. **Home Page**: Main todo list with filtering and sorting options
3. **Add/Edit Todos**: Form to create or edit todos with various options
4. **Dashboard**: Statistics and charts showing todo completion rates
5. **Profile**: User profile management

## 🔒 API Endpoints

### Auth Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Delete user account

### Todo Endpoints
- `GET /api/todos` - Get all todos for the current user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion
- `GET /api/todos/stats` - Get todo statistics
- `GET /api/todos/date-range` - Get todos by date range
- `GET /api/todos/count` - Get todos count by priority and status

## 💡 Future Enhancements

- [ ] Drag and drop reordering of todos
- [ ] Calendar view of todos
- [ ] Subtasks and nested todos
- [ ] Collaborative todos and sharing
- [ ] Email/push notifications for reminders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

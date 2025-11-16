# Student Management System

A full-stack web application for managing student information, grades, and academic records. Built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

- 🔐 User Authentication (Register/Login)
- 👥 Student CRUD Operations
- 📊 Dashboard with Statistics
- 📝 Grade Management
- 🔍 Search Functionality
- 📱 Responsive Design
- 🎨 Modern UI with Gradient Design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Vite for build tooling
- Modern CSS with gradients

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server (from `backend` directory):
```bash
npm run dev
```

3. Start the frontend server (from `frontend` directory):
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

5. Register a new account or login with existing credentials

6. Start managing students!

## Project Structure

```
student-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authControllers.js
│   │   │   └── studentControllers.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Student.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── students.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── StudentCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Students.jsx
│   │   │   └── StudentForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Students
- `GET /api/students` - Get all students (protected)
- `GET /api/students/:id` - Get single student (protected)
- `POST /api/students` - Create new student (protected)
- `PUT /api/students/:id` - Update student (protected)
- `DELETE /api/students/:id` - Delete student (protected)

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!


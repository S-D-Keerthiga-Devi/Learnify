# Learnify Backend Server

Backend API for the Learnify online course platform built with Node.js, Express, MongoDB, and Clerk authentication.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Clerk account for authentication

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `PORT`: Server port (default: 5000)
- `CLIENT_URL`: Frontend URL for CORS

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Seeding the Database

To populate the database with course data:
```bash
npm run seed
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses (with search, filter, pagination)
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/featured` - Get featured courses

### Enrollments (Protected)
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments` - Get user's enrollments
- `DELETE /api/enrollments/:courseId` - Unenroll from course
- `GET /api/enrollments/check/:courseId` - Check enrollment status

### Progress (Protected)
- `GET /api/progress/:courseId` - Get course progress
- `POST /api/progress/:courseId/lecture` - Mark lecture complete
- `GET /api/progress/stats` - Get progress statistics

### Users (Protected)
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile

## Authentication

All protected routes require a valid Clerk JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Project Structure

```
server/
├── config/
│   └── database.js       # MongoDB connection
├── controllers/
│   ├── courseController.js
│   ├── enrollmentController.js
│   ├── progressController.js
│   └── userController.js
├── middleware/
│   ├── auth.js           # Clerk authentication
│   └── errorHandler.js
├── models/
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Progress.js
│   └── User.js
├── routes/
│   ├── courses.js
│   ├── enrollments.js
│   ├── progress.js
│   └── users.js
├── scripts/
│   └── seedCourses.js    # Database seeding
├── .env.example
├── .gitignore
├── package.json
└── server.js             # Entry point
```

## License

MIT

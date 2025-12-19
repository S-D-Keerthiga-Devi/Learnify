# 📚 Learnify - Online Course Platform

A modern, full-stack online learning platform built with the MERN stack, featuring user authentication, course management, enrollment tracking, and progress monitoring.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Overview

Learnify is a comprehensive e-learning platform that enables students to browse, enroll in, and complete online courses. The platform features a modern, responsive UI with smooth animations and an intuitive user experience.

## ✨ Key Features

### 🎓 For Students
- **Course Discovery**: Browse and search through a wide catalog of courses
- **Featured Courses**: Highlighted courses on the homepage for quick access
- **Course Enrollment**: Easy one-click enrollment system
- **Progress Tracking**: Monitor learning progress for each enrolled course
- **Video Player**: Integrated video player for course content
- **My Enrollments**: Dashboard to view all enrolled courses and their progress

### 🔐 Authentication & Security
- **Clerk Authentication**: Secure user authentication and session management
- **Protected Routes**: Role-based access control for student areas
- **User Profiles**: Automatic user profile creation and management

### 🎨 User Interface
- **Modern Design**: Clean, professional UI built with Material-UI and Tailwind CSS
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Enhanced UX with Motion (Framer Motion) animations
- **Grid Backgrounds**: Modern visual effects using custom UI components
- **Dark Mode Ready**: Styled components ready for theme switching

### 🔧 Technical Features
- **RESTful API**: Well-structured backend API with Express.js
- **MongoDB Database**: Scalable NoSQL database for data persistence
- **Error Handling**: Comprehensive error handling middleware
- **CORS Support**: Configured for secure cross-origin requests
- **Environment Configuration**: Secure environment variable management

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM 7.9** - Client-side routing
- **Axios** - HTTP client for API requests
- **Clerk React** - Authentication and user management
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.9** - MongoDB object modeling
- **Clerk SDK** - Server-side authentication
- **Express Validator** - Request validation middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Online course site/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API integration layer
│   │   ├── assets/        # Static assets (images, icons)
│   │   ├── components/    # Reusable React components
│   │   │   ├── Student/   # Student-specific components
│   │   │   └── ui/        # UI components (grid-background, etc.)
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Page components
│   │   │   └── Student/   # Student pages (Home, CourseList, etc.)
│   │   ├── lib/           # Utility functions
│   │   ├── App.jsx        # Main App component
│   │   ├── Layout.jsx     # Layout wrapper
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── config/            # Configuration files (database)
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware (auth, error handling)
    ├── models/            # Mongoose models (User, Course, etc.)
    ├── routes/            # API routes
    │   ├── courses.js
    │   ├── enrollments.js
    │   ├── progress.js
    │   └── users.js
    ├── scripts/           # Utility scripts (seed data)
    ├── server.js          # Server entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Online course site"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   CLERK_SECRET_KEY=your_clerk_secret_key
   NODE_ENV=development
   ```

   Create `.env` file in the `client` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5000
   ```

5. **Seed Database (Optional)**
   ```bash
   cd server
   npm run seed
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

## 📡 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get course by ID

### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments/:id` - Get enrollment details

### Progress
- `GET /api/progress/:enrollmentId` - Get course progress
- `PUT /api/progress/:enrollmentId` - Update progress

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Health Check
- `GET /health` - API health status

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 👨‍💻 Developer

**Keerthiga**
- Portfolio: [[Your Portfolio URL](https://keerthiga-dev.vercel.app)]
- LinkedIn: [[Your LinkedIn URL](https://www.linkedin.com/in/s-d-keerthiga-devi-5262bb27b/)]
- GitHub: [[Your GitHub URL](https://github.com/S-D-Keerthiga-Devi)]

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Material-UI for the component library
- Clerk for authentication services
- MongoDB for database solutions
- Vite for the blazing-fast build tool

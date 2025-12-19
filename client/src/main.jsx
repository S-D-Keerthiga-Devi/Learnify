import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Student/Home'
import { AppContextProvider } from './context/AppContent'
import CourseList from './pages/Student/CourseList'
import CourseDetails from './pages/Student/CourseDetails'
import MyEnrollments from './pages/Student/MyEnrollments'
import Player from './pages/Student/Player'
import Loading from './components/Student/Loading'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from "@material-tailwind/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// ✅ Define router properly
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/course-list' element={<CourseList />} />
      <Route path='/course-list/:input' element={<CourseList />} />
      <Route path='/course/:id' element={<CourseDetails />} />
      <Route path='/my-enrollments' element={<MyEnrollments />} />
      <Route path='/player/:courseId' element={<Player />} />
      <Route path='/loading/:path' element={<Loading />} />
    </Route>
  )
)

// ✅ Render app
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <ThemeProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </ThemeProvider>
  </ClerkProvider>

)

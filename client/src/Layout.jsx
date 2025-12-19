import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Student/Navbar'
import { useMatch } from 'react-router-dom'
import Footer from './components/Student/Footer'

const Layout = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div>
      {!isEducatorRoute && <Navbar/>}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout

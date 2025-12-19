import Hero from '../../components/Student/Hero'
import InfiniteMovingCardsDemo from '../../components/Student/TestimonialsSection'
import React from 'react'
import CoursesSection from '../../components/Student/CoursesSection'
import OrbitingCirclesDemo from '../../components/Student/Companies'
import CallToAction from '../../components/Student/CallToAction'

function Home() {
  return (
    <div>
      <Hero/>
      <OrbitingCirclesDemo/>
      <CoursesSection/>
      <InfiniteMovingCardsDemo/>
      <CallToAction/>
    </div>
  )
}

export default Home

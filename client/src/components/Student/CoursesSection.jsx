// CoursesSection.jsx
import { AppContext } from '../../context/AppContent'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CourseCard } from './CourseCard'
import { ArrowRight, Sparkles } from 'lucide-react'

function CoursesSection() {
  const { allCourses } = useContext(AppContext)

  return (
    <section className='pt-20 pb-10 px-6 md:px-12 lg:px-20 xl:px-40 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            <Sparkles className='w-4 h-4' />
            Featured Courses
          </div>

          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Learn from the <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>Best</span>
          </h2>

          <p className='text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Discover our top-rated courses across various categories. From coding and design to business and wellness,
            our courses are crafted by industry experts to deliver real results.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCourses.slice(0, 4).map((course, index) => (
            <CourseCard key={course._id || index} course={course} />
          ))}
        </div>

        {/* CTA Button */}
        <div className='flex justify-center mt-10'>
          <Link
            to={'/course-list'}
            onClick={() => scrollTo(0, 0)}
            className='group inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg'
          >
            <span>Explore All Courses</span>
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
          </Link>
        </div>
      </div>
    </section>

  )
}

export default CoursesSection
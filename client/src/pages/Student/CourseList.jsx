import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Filter, Search, X } from 'lucide-react';
import { CourseCard } from '../../components/Student/CourseCard';
import { AppContext } from '../../context/AppContent';

const CourseList = () => {
  const { allCourses } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Read search query from URL on mount
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Filter courses based on search and level
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrolledStudents - a.enrolledStudents;
      case 'price-low':
        return (a.coursePrice - (a.discount * a.coursePrice) / 100) -
          (b.coursePrice - (b.discount * b.coursePrice) / 100);
      case 'price-high':
        return (b.coursePrice - (b.discount * b.coursePrice) / 100) -
          (a.coursePrice - (a.discount * a.coursePrice) / 100);
      case 'rating':
        const avgRatingA = a.courseRatings.length > 0
          ? a.courseRatings.reduce((sum, r) => sum + r.rating, 0) / a.courseRatings.length
          : 0;
        const avgRatingB = b.courseRatings.length > 0
          ? b.courseRatings.reduce((sum, r) => sum + r.rating, 0) / b.courseRatings.length
          : 0;
        return avgRatingB - avgRatingA;
      default:
        return 0;
    }
  });

  const levels = ['All', 'All Levels', 'Beginner', 'Intermediate', 'Intermediate to Advanced'];

  return (
    <section className='min-h-screen py-20 px-6 md:px-12 lg:px-20 xl:px-40 bg-gradient-to-b from-white via-gray-50 to-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            <Sparkles className='w-4 h-4' />
            All Courses
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Explore Our <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Course Catalog</span>
          </h1>
          <p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Browse through our comprehensive collection of courses designed by industry experts to help you achieve your learning goals.
          </p>
        </div>

        {/* Filters Section */}
        <div className='bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search Bar */}
            <div className='md:col-span-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search courses...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    <X className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <div className='relative'>
                <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer'
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer'
              >
                <option value='popular'>Most Popular</option>
                <option value='rating'>Highest Rated</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedLevel !== 'All') && (
            <div className='flex items-center gap-2 mt-4 pt-4 border-t border-gray-100'>
              <span className='text-sm text-gray-600 font-medium'>Active filters:</span>
              {searchTerm && (
                <span className='inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm'>
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className='hover:text-blue-900'>
                    <X className='w-3 h-3' />
                  </button>
                </span>
              )}
              {selectedLevel !== 'All' && (
                <span className='inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm'>
                  Level: {selectedLevel}
                  <button onClick={() => setSelectedLevel('All')} className='hover:text-purple-900'>
                    <X className='w-3 h-3' />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-gray-600'>
            Showing <span className='font-semibold text-gray-900'>{sortedCourses.length}</span> {sortedCourses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {/* Courses Grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCourses.map((course, index) => (
              <CourseCard key={course._id || index} course={course} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>No courses found</h3>
            <p className='text-gray-600 mb-6'>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('All');
              }}
              className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300'
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseList;
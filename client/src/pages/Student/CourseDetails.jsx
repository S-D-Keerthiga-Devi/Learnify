import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { AppContext } from '../../context/AppContent';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Award,
  Globe,
  Calendar,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  Check
} from 'lucide-react';

function CourseDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const { allCourses, enrollInCourse, isEnrolled } = useContext(AppContext);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = allCourses.find(c => c._id === id);
    setCourse(foundCourse);

    // Initialize all chapters as collapsed
    if (foundCourse?.courseContent) {
      const initialState = {};
      foundCourse.courseContent.forEach((chapter, index) => {
        initialState[index] = false;
      });
      setExpandedChapters(initialState);
    }
  }, [id, allCourses]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Check if user is already enrolled in this course
  const enrolled = isEnrolled(course._id);

  // Calculate average rating
  const avgRating = course.courseRatings.length > 0
    ? (course.courseRatings.reduce((sum, r) => sum + r.rating, 0) / course.courseRatings.length).toFixed(1)
    : 0;

  // Calculate discounted price
  const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);

  // Format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const toggleChapter = (index) => {
    setExpandedChapters(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please sign in to enroll in courses");
      return;
    }

    if (enrolled) {
      return; // Already enrolled
    }

    enrollInCourse(course);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4">
          <Link
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Courses</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Sparkles className="w-4 h-4" />
                {course.level}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {course.courseTitle}
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed">
                {course.courseDescription}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-xl">{avgRating}</span>
                  <span className="text-blue-200">({course.courseRatings.length} ratings)</span>
                </div>

                <div className="flex items-center gap-2 text-blue-200">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledStudents.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-2 text-blue-200">
                  <Globe className="w-5 h-5" />
                  <span>{course.language}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  {course.educator.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-blue-200">Created by</p>
                  <p className="font-semibold text-lg">{course.educator.name}</p>
                  <p className="text-sm text-blue-200">{course.educator.title}</p>
                </div>
              </div>
            </div>

            {/* Right Card - Price */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-6">
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover"
                  />
                  {enrolled && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Enrolled
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">${discountedPrice}</span>
                    {course.discount > 0 && (
                      <>
                        <span className="text-xl text-gray-400 line-through">${course.coursePrice.toFixed(2)}</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                          {course.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {enrolled ? (
                    <Link
                      to={`/player/${course._id}`}
                      className="w-full block"
                    >
                      <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2">
                        <PlayCircle className="w-5 h-5" />
                        Start Learning
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Enroll Now
                    </button>
                  )}

                  <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>{formatDuration(course.totalDuration)} total length</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>{course.totalLectures} lectures</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Last updated {course.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-3">
                {course.courseContent.map((chapter, chapterIndex) => (
                  <div key={chapter.chapterId} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleChapter(chapterIndex)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">
                          {chapter.chapterOrder}
                        </div>
                        <span className="font-semibold text-gray-900">{chapter.chapterTitle}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {chapter.chapterContent.length} lectures
                        </span>
                        {expandedChapters[chapterIndex] ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </button>

                    {expandedChapters[chapterIndex] && (
                      <div className="bg-white border-t border-gray-200">
                        {chapter.chapterContent.map((lecture) => {
                          const canAccess = enrolled || lecture.isPreviewFree;
                          const LectureWrapper = canAccess ? Link : 'div';
                          const wrapperProps = canAccess
                            ? {
                              to: `/course/${course._id}/lecture/${lecture.lectureId}`,
                              onClick: () => scrollTo(0, 0)
                            }
                            : {};

                          return (
                            <LectureWrapper
                              key={lecture.lectureId}
                              {...wrapperProps}
                              className={`flex items-center justify-between p-4 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${canAccess
                                ? 'hover:bg-blue-50 cursor-pointer group'
                                : 'hover:bg-gray-50 cursor-not-allowed opacity-60'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle className={`w-5 h-5 ${canAccess
                                  ? 'text-blue-600 group-hover:text-blue-700'
                                  : 'text-gray-400'
                                  }`} />
                                <span className={`${canAccess
                                  ? 'text-gray-900 group-hover:text-blue-700 font-medium'
                                  : 'text-gray-500'
                                  }`}>
                                  {lecture.lectureTitle}
                                </span>
                                {lecture.isPreviewFree && (
                                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold group-hover:bg-blue-200">
                                    Preview
                                  </span>
                                )}
                                {!canAccess && (
                                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-semibold">
                                    Locked
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-600">
                                {formatDuration(lecture.lectureDuration)}
                              </span>
                            </LectureWrapper>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  {course.educator.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{course.educator.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{course.educator.title}</p>
                  <p className="text-gray-700 leading-relaxed">{course.educator.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar (Desktop only) */}
          <div className="hidden md:block md:col-span-1">
            {/* This space is intentionally left for the sticky price card above */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
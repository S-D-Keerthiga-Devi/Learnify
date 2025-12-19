import React, { useContext } from "react";
import { AppContext } from "../../context/AppContent";
import { useUser } from "@clerk/clerk-react";
import {
  BookOpen,
  GraduationCap,
  AlertCircle,
  Clock,
  PlayCircle,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

function MyEnrollments() {
  const { enrollments, getCourseProgress } = useContext(AppContext);
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 md:px-12 lg:px-20 xl:px-40 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your enrollments.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const EnrollmentCard = ({ course }) => {
    const progress = getCourseProgress(course._id);
    const totalLectures = course.courseContent.reduce(
      (sum, chapter) => sum + chapter.chapterContent.length,
      0
    );
    const completedLectures = progress?.completedLectures?.length || 0;
    const progressPercentage = Math.round(
      (completedLectures / totalLectures) * 100
    );

    const avgRating =
      course.courseRatings.length > 0
        ? (
          course.courseRatings.reduce((sum, r) => sum + r.rating, 0) /
          course.courseRatings.length
        ).toFixed(1)
        : 0;

    const isCompleted = progressPercentage === 100;
    const isInProgress = progressPercentage > 0 && progressPercentage < 100;

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Progress Badge */}
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completed
            </div>
          )}
          {isInProgress && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg">
              {progressPercentage}% Complete
            </div>
          )}
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white rounded-full p-4">
              <PlayCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
            {course.courseTitle}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold">
              {course.educator.name.charAt(0)}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {course.educator.name}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{avgRating}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{Math.floor(course.totalDuration / 60)}h</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{totalLectures}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${isCompleted
                  ? "bg-green-500"
                  : isInProgress
                    ? "bg-blue-500"
                    : "bg-gray-300"
                  }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedLectures} of {totalLectures} lectures completed
            </p>
          </div>

          {/* Action Button */}
          <Link to={`/player/${course._id}`} className="block w-full">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" />
              {isCompleted
                ? "Review Course"
                : isInProgress
                  ? "Continue Learning"
                  : "Start Course"}
            </button>
          </Link>
        </div>
      </div>
    );
  };

  // Calculate completed courses for stats
  const completedCoursesCount = enrollments.filter((course) => {
    const progress = getCourseProgress(course._id);
    const totalLectures = course.courseContent.reduce(
      (sum, chapter) => sum + chapter.chapterContent.length,
      0
    );
    const completedLectures = progress?.completedLectures?.length || 0;
    return completedLectures === totalLectures && totalLectures > 0;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 md:px-12 lg:px-20 xl:px-40 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                My Enrollments
              </h1>
              <p className="text-gray-600 mt-1">
                {enrollments.length}{" "}
                {enrollments.length === 1 ? "course" : "courses"} enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Enrollments Grid */}
        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((course) => (
              <EnrollmentCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Enrollments Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your learning journey today! Browse our course catalog and
              enroll in courses that interest you.
            </p>
            <Link
              to="/course-list"
              onClick={() => scrollTo(0, 0)}
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Browse Courses
            </Link>
          </div>
        )}

        {/* Stats Section (if enrolled) */}
        {enrollments.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrollments.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCoursesCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Learning Hours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.floor(
                      enrollments.reduce(
                        (sum, course) => sum + course.totalDuration,
                        0
                      ) / 60
                    )}
                    h
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEnrollments;
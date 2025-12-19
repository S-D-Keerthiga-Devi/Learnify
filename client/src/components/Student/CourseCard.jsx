import React, { useState, useContext } from "react";
import { Star, Clock, BookOpen, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContent";

export function CourseCard({ course, currency = "$" }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const { enrollments, enrollInCourse, isEnrolled } = useContext(AppContext);

  // Check if user is already enrolled in this course
  const enrolled = isEnrolled(course._id);

  // Calculate average rating
  const avgRating =
    course.courseRatings.length > 0
      ? (
        course.courseRatings.reduce((sum, r) => sum + r.rating, 0) /
        course.courseRatings.length
      ).toFixed(1)
      : 0;

  // Calculate discounted price
  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  // Format duration (convert minutes to hours)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const handleEnroll = (e) => {
    e.preventDefault(); // Prevent Link navigation
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
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="block w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"
            }`}
        />
        {course.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg">
            {course.discount}% OFF
          </div>
        )}
        {enrolled && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Check className="w-3 h-3" />
            Enrolled
          </div>
        )}
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
            {course.educator.avatar || course.educator.name.charAt(0)}
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
            <span className="text-gray-500">
              ({course.courseRatings.length})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(course.totalDuration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{course.totalLectures}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-gray-900">
              {currency}
              {discountedPrice}
            </span>
            {course.discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                {currency}
                {course.coursePrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleEnroll}
            disabled={enrolled}
            className={`font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-lg ${enrolled
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default"
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
              }`}
          >
            {enrolled ? (
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                Enrolled
              </span>
            ) : (
              "Enroll"
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
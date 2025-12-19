import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { courseAPI, enrollmentAPI, progressAPI } from "../api/client";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { user } = useUser();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to store enrollments
  const [enrollments, setEnrollments] = useState([]);

  // State to store course progress
  const [courseProgress, setCourseProgress] = useState({});

  // Fetch all courses from backend
  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      setAllCourses(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
      // Fallback to empty array if API fails
      setAllCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user enrollments from backend
  const fetchEnrollments = async () => {
    if (!user) {
      setEnrollments([]);
      return;
    }

    try {
      const response = await enrollmentAPI.getMyEnrollments();
      setEnrollments(response.data.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setEnrollments([]);
    }
  };

  // Fetch progress for a specific course
  const fetchCourseProgress = async (courseId) => {
    if (!user) return null;

    try {
      const response = await progressAPI.getCourseProgress(courseId);
      setCourseProgress(prev => ({
        ...prev,
        [courseId]: response.data.data
      }));
      return response.data.data;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  // Function to enroll in a course
  const enrollInCourse = async (course) => {
    if (!user) {
      alert("Please sign in to enroll");
      return;
    }

    try {
      await enrollmentAPI.enroll(course._id);

      // Refresh enrollments
      await fetchEnrollments();

      alert(`Successfully enrolled in "${course.courseTitle}"!`);
    } catch (error) {
      console.error('Error enrolling:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to enroll in course');
      }
    }
  };

  // Function to check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    if (!user) return false;
    return enrollments.some((course) => course._id === courseId);
  };

  // Function to unenroll from a course
  const unenrollFromCourse = async (courseId) => {
    if (!user) return;

    try {
      await enrollmentAPI.unenroll(courseId);

      // Refresh enrollments
      await fetchEnrollments();

      alert("Successfully unenrolled from course!");
    } catch (error) {
      console.error('Error unenrolling:', error);
      alert('Failed to unenroll from course');
    }
  };

  // Function to update lecture progress
  const updateLectureProgress = async (courseId, chapterIndex, lectureIndex) => {
    if (!user) return;

    try {
      const response = await progressAPI.markLectureComplete(
        courseId,
        chapterIndex,
        lectureIndex
      );

      // Update local progress state
      setCourseProgress(prev => ({
        ...prev,
        [courseId]: response.data.data
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Function to get course progress
  const getCourseProgress = (courseId) => {
    if (!user) return null;

    // Return cached progress or fetch if not available
    if (courseProgress[courseId]) {
      return courseProgress[courseId];
    }

    // Fetch progress asynchronously
    fetchCourseProgress(courseId);

    return {
      completedLectures: [],
      lastWatchedLecture: null,
    };
  };

  const value = {
    currency,
    allCourses,
    setAllCourses,
    isEducator,
    setIsEducator,
    enrollments,
    enrollInCourse,
    isEnrolled,
    unenrollFromCourse,
    updateLectureProgress,
    getCourseProgress,
    loading,
    error,
    fetchAllCourses,
    fetchEnrollments,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
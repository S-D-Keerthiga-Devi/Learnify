import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContent";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Lock,
  PlayCircle,
  Clock,
  BookOpen,
} from "lucide-react";

function Player() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { enrollments, updateLectureProgress, getCourseProgress } =
    useContext(AppContext);

  const [course, setCourse] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Find the enrolled course
    const enrolledCourse = enrollments.find((c) => c._id === courseId);
    if (!enrolledCourse) {
      navigate("/my-enrollments");
      return;
    }
    setCourse(enrolledCourse);

    // Resume from last watched lecture
    const progress = getCourseProgress(courseId);
    if (progress && progress.lastWatchedLecture) {
      const { chapterIndex, lectureIndex } = progress.lastWatchedLecture;
      setCurrentChapterIndex(chapterIndex);
      setCurrentLectureIndex(lectureIndex);
    }
  }, [courseId, enrollments, navigate, getCourseProgress]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentChapter = course.courseContent[currentChapterIndex];
  const currentLecture = currentChapter?.chapterContent[currentLectureIndex];
  const progress = getCourseProgress(courseId);

  const handleLectureComplete = () => {
    updateLectureProgress(courseId, currentChapterIndex, currentLectureIndex);
    handleNextLecture();
  };

  const handleNextLecture = () => {
    const nextLectureIndex = currentLectureIndex + 1;
    if (nextLectureIndex < currentChapter.chapterContent.length) {
      setCurrentLectureIndex(nextLectureIndex);
    } else {
      const nextChapterIndex = currentChapterIndex + 1;
      if (nextChapterIndex < course.courseContent.length) {
        setCurrentChapterIndex(nextChapterIndex);
        setCurrentLectureIndex(0);
      }
    }
  };

  const handlePreviousLecture = () => {
    const prevLectureIndex = currentLectureIndex - 1;
    if (prevLectureIndex >= 0) {
      setCurrentLectureIndex(prevLectureIndex);
    } else {
      const prevChapterIndex = currentChapterIndex - 1;
      if (prevChapterIndex >= 0) {
        const prevChapter = course.courseContent[prevChapterIndex];
        setCurrentChapterIndex(prevChapterIndex);
        setCurrentLectureIndex(prevChapter.chapterContent.length - 1);
      }
    }
  };

  const selectLecture = (chapterIndex, lectureIndex) => {
    setCurrentChapterIndex(chapterIndex);
    setCurrentLectureIndex(lectureIndex);
  };

  const isLectureCompleted = (chapterIndex, lectureIndex) => {
    return progress?.completedLectures?.some(
      (l) => l.chapterIndex === chapterIndex && l.lectureIndex === lectureIndex
    );
  };

  const getYouTubeEmbedUrl = (url) => {
    // Handle various YouTube URL formats
    let videoId = '';

    if (url.includes('youtu.be/')) {
      // Format: https://youtu.be/VIDEO_ID
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (url.includes('youtube.com/embed/')) {
      // Already an embed URL
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  };

  const totalLectures = course.courseContent.reduce(
    (sum, chapter) => sum + chapter.chapterContent.length,
    0
  );
  const completedLectures = progress?.completedLectures?.length || 0;
  const progressPercentage = Math.round(
    (completedLectures / totalLectures) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/my-enrollments")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 line-clamp-1">
                {course.courseTitle}
              </h1>
              <p className="text-sm text-gray-600">
                {completedLectures} of {totalLectures} lectures completed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-700">
              {progressPercentage}% Complete
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="bg-black aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(currentLecture.lectureUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Lecture Info & Controls */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentLecture.lectureTitle}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.floor(currentLecture.lectureDuration / 60)} min
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Chapter {currentChapterIndex + 1} - Lecture{" "}
                    {currentLectureIndex + 1}
                  </span>
                </div>
              </div>
              {!isLectureCompleted(currentChapterIndex, currentLectureIndex) && (
                <button
                  onClick={handleLectureComplete}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviousLecture}
                disabled={currentChapterIndex === 0 && currentLectureIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNextLecture}
                disabled={
                  currentChapterIndex === course.courseContent.length - 1 &&
                  currentLectureIndex ===
                  currentChapter.chapterContent.length - 1
                }
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div
          className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarOpen ? "w-96" : "w-0"
            } overflow-hidden`}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Course Content</h3>
            </div>
            {course.courseContent.map((chapter, chapterIdx) => (
              <div key={chapter.chapterId} className="border-b border-gray-200">
                <div className="p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {chapter.chapterTitle}
                  </h4>
                </div>
                {chapter.chapterContent.map((lecture, lectureIdx) => {
                  const isCompleted = isLectureCompleted(chapterIdx, lectureIdx);
                  const isCurrent =
                    chapterIdx === currentChapterIndex &&
                    lectureIdx === currentLectureIndex;

                  return (
                    <button
                      key={lecture.lectureId}
                      onClick={() => selectLecture(chapterIdx, lectureIdx)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${isCurrent
                        ? "border-blue-600 bg-blue-50"
                        : "border-transparent"
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : isCurrent ? (
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${isCurrent ? "text-blue-600" : "text-gray-900"
                              }`}
                          >
                            {lecture.lectureTitle}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.floor(lecture.lectureDuration / 60)} min
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-4 top-24 bg-white border border-gray-200 p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors z-10"
      >
        {sidebarOpen ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default Player;
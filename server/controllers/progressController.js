import Progress from '../models/Progress.js';
import Course from '../models/Course.js';

// Get progress for a course
export const getCourseProgress = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        let progress = await Progress.findOne({ userId, courseId });

        if (!progress) {
            // Create empty progress if doesn't exist
            progress = await Progress.create({
                userId,
                courseId,
                completedLectures: [],
                lastWatchedLecture: null,
            });
        }

        const completionPercentage = await progress.getCompletionPercentage();

        res.json({
            success: true,
            data: {
                ...progress.toObject(),
                completionPercentage,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Mark lecture as complete
export const markLectureComplete = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { chapterIndex, lectureIndex } = req.body;
        const userId = req.user._id;

        // Validate indices
        if (chapterIndex === undefined || lectureIndex === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Chapter index and lecture index are required',
            });
        }

        let progress = await Progress.findOne({ userId, courseId });

        if (!progress) {
            progress = new Progress({
                userId,
                courseId,
                completedLectures: [],
            });
        }

        // Check if lecture is already completed
        const isCompleted = progress.completedLectures.some(
            lecture =>
                lecture.chapterIndex === chapterIndex &&
                lecture.lectureIndex === lectureIndex
        );

        if (!isCompleted) {
            progress.completedLectures.push({
                chapterIndex,
                lectureIndex,
                completedAt: new Date(),
            });
        }

        // Update last watched lecture
        progress.lastWatchedLecture = {
            chapterIndex,
            lectureIndex,
        };

        await progress.save();

        const completionPercentage = await progress.getCompletionPercentage();

        res.json({
            success: true,
            message: 'Lecture marked as complete',
            data: {
                ...progress.toObject(),
                completionPercentage,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get overall progress statistics
export const getProgressStats = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const allProgress = await Progress.find({ userId }).populate('courseId');

        let totalCourses = allProgress.length;
        let completedCourses = 0;
        let totalLearningHours = 0;

        for (const progress of allProgress) {
            const percentage = await progress.getCompletionPercentage();
            if (percentage === 100) {
                completedCourses++;
            }

            if (progress.courseId) {
                totalLearningHours += progress.courseId.totalDuration || 0;
            }
        }

        res.json({
            success: true,
            data: {
                totalCourses,
                completedCourses,
                inProgressCourses: totalCourses - completedCourses,
                totalLearningHours: Math.floor(totalLearningHours / 60), // Convert to hours
            },
        });
    } catch (error) {
        next(error);
    }
};

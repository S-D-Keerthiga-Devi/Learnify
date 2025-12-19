import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

// Enroll in a course
export const enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course',
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            userId,
            courseId,
        });

        // Increment enrolled students count
        await Course.findByIdAndUpdate(courseId, {
            $inc: { enrolledStudents: 1 },
        });

        res.status(201).json({
            success: true,
            message: 'Successfully enrolled in course',
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

// Get user's enrollments
export const getUserEnrollments = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const enrollments = await Enrollment.find({ userId })
            .populate('courseId')
            .sort({ enrolledAt: -1 });

        // Extract course data
        const courses = enrollments.map(enrollment => enrollment.courseId);

        res.json({
            success: true,
            data: courses,
        });
    } catch (error) {
        next(error);
    }
};

// Unenroll from a course
export const unenrollFromCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const enrollment = await Enrollment.findOneAndDelete({ userId, courseId });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found',
            });
        }

        // Decrement enrolled students count
        await Course.findByIdAndUpdate(courseId, {
            $inc: { enrolledStudents: -1 },
        });

        res.json({
            success: true,
            message: 'Successfully unenrolled from course',
        });
    } catch (error) {
        next(error);
    }
};

// Check if enrolled in a course
export const checkEnrollment = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const enrollment = await Enrollment.findOne({ userId, courseId });

        res.json({
            success: true,
            data: {
                isEnrolled: !!enrollment,
            },
        });
    } catch (error) {
        next(error);
    }
};

import Course from '../models/Course.js';

// Get all published courses
export const getAllCourses = async (req, res, next) => {
    try {
        const {
            search,
            level,
            language,
            minPrice,
            maxPrice,
            sortBy = 'popular',
            page = 1,
            limit = 50
        } = req.query;

        // Build query
        const query = { isPublished: true };

        // Search filter
        if (search) {
            query.$or = [
                { courseTitle: { $regex: search, $options: 'i' } },
                { courseDescription: { $regex: search, $options: 'i' } },
            ];
        }

        // Level filter
        if (level && level !== 'All') {
            query.level = level;
        }

        // Language filter
        if (language) {
            query.language = language;
        }

        // Price filter
        if (minPrice || maxPrice) {
            query.coursePrice = {};
            if (minPrice) query.coursePrice.$gte = parseFloat(minPrice);
            if (maxPrice) query.coursePrice.$lte = parseFloat(maxPrice);
        }

        // Sorting
        let sort = {};
        switch (sortBy) {
            case 'popular':
                sort = { enrolledStudents: -1 };
                break;
            case 'price-low':
                sort = { coursePrice: 1 };
                break;
            case 'price-high':
                sort = { coursePrice: -1 };
                break;
            case 'newest':
                sort = { createdAt: -1 };
                break;
            default:
                sort = { enrolledStudents: -1 };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const courses = await Course.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Course.countDocuments(query);

        res.json({
            success: true,
            data: courses,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get course by ID
export const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        res.json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// Get featured courses (top rated or most popular)
export const getFeaturedCourses = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const courses = await Course.find({ isPublished: true })
            .sort({ enrolledStudents: -1 })
            .limit(limit);

        res.json({
            success: true,
            data: courses,
        });
    } catch (error) {
        next(error);
    }
};

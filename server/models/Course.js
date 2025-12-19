import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    lectureId: String,
    lectureTitle: String,
    lectureDuration: Number,
    lectureUrl: String,
    isPreviewFree: Boolean,
    lectureOrder: Number,
});

const chapterSchema = new mongoose.Schema({
    chapterId: String,
    chapterOrder: Number,
    chapterTitle: String,
    chapterContent: [lectureSchema],
});

const ratingSchema = new mongoose.Schema({
    userId: String,
    rating: Number,
    _id: String,
});

const educatorSchema = new mongoose.Schema({
    id: String,
    name: String,
    title: String,
    bio: String,
});

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
        trim: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    coursePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    level: {
        type: String,
        enum: ['All Levels', 'Beginner', 'Intermediate', 'Intermediate to Advanced', 'Advanced'],
        default: 'All Levels',
    },
    language: {
        type: String,
        default: 'English',
    },
    lastUpdated: {
        type: String,
    },
    courseContent: [chapterSchema],
    educator: educatorSchema,
    enrolledStudents: {
        type: Number,
        default: 0,
    },
    courseRatings: [ratingSchema],
    totalLectures: {
        type: Number,
        default: 0,
    },
    totalDuration: {
        type: Number,
        default: 0,
    },
    courseThumbnail: {
        type: String,
        default: '',
    },
    requirements: [String],
    learningOutcomes: [String],
}, {
    timestamps: true,
});

// Index for searching
courseSchema.index({ courseTitle: 'text', courseDescription: 'text' });

// Virtual for discounted price
courseSchema.virtual('discountedPrice').get(function () {
    return this.coursePrice - (this.coursePrice * this.discount / 100);
});

// Method to calculate average rating
courseSchema.methods.getAverageRating = function () {
    if (this.courseRatings.length === 0) return 0;
    const sum = this.courseRatings.reduce((acc, rating) => acc + rating.rating, 0);
    return (sum / this.courseRatings.length).toFixed(1);
};

const Course = mongoose.model('Course', courseSchema);

export default Course;

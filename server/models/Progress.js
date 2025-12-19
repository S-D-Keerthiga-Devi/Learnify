import mongoose from 'mongoose';

const completedLectureSchema = new mongoose.Schema({
    chapterIndex: {
        type: Number,
        required: true,
    },
    lectureIndex: {
        type: Number,
        required: true,
    },
    completedAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });

const lastWatchedSchema = new mongoose.Schema({
    chapterIndex: {
        type: Number,
        required: true,
    },
    lectureIndex: {
        type: Number,
        required: true,
    },
}, { _id: false });

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    completedLectures: [completedLectureSchema],
    lastWatchedLecture: lastWatchedSchema,
}, {
    timestamps: true,
});

// Compound index for efficient queries
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Method to calculate completion percentage
progressSchema.methods.getCompletionPercentage = async function () {
    const course = await mongoose.model('Course').findById(this.courseId);
    if (!course) return 0;

    const totalLectures = course.courseContent.reduce(
        (sum, chapter) => sum + chapter.chapterContent.length,
        0
    );

    if (totalLectures === 0) return 0;

    return Math.round((this.completedLectures.length / totalLectures) * 100);
};

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;

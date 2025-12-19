// Simple seed script - copy course data from client assets manually
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learnify')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Define Course schema inline
const courseSchema = new mongoose.Schema({}, { strict: false });
const Course = mongoose.model('Course', courseSchema);

// Import courses from client - you need to copy the professionalCourses array here
// For now, let's import it dynamically
import('../../client/src/assets/assets.js')
  .then(async (module) => {
    const courses = module.professionalCourses;

    console.log(`📚 Found ${courses.length} courses to seed`);

    // Clear existing
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    // Insert new
    const result = await Course.insertMany(courses);
    console.log(`✅ Successfully seeded ${result.length} courses!`);

    result.forEach((course, i) => {
      console.log(`  ${i + 1}. ${course.courseTitle}`);
    });

    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

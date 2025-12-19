import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import connectDB from '../config/database.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read course data from client assets
const getCoursesData = () => {
    try {
        // Read the assets file
        const assetsPath = join(__dirname, '../../client/src/assets/assets.js');
        const assetsContent = readFileSync(assetsPath, 'utf-8');

        // Extract the professionalCourses array
        const match = assetsContent.match(/export const professionalCourses = (\[[\s\S]*?\]);/);

        if (!match) {
            throw new Error('Could not find professionalCourses in assets.js');
        }

        // Convert to valid JSON by removing comments and fixing syntax
        let coursesStr = match[1]
            .replace(/\/\/.*/g, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

        // Use eval in a safe context (only for this script)
        const coursesData = eval(coursesStr);

        return coursesData;
    } catch (error) {
        console.error('Error reading courses data:', error.message);
        console.log('Using fallback: empty array');
        return [];
    }
};

const seedCourses = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing courses...');
        await Course.deleteMany({});

        console.log('📚 Loading course data...');
        const coursesData = getCoursesData();

        if (coursesData.length === 0) {
            console.log('⚠️  No course data found!');
            console.log('Please ensure client/src/assets/assets.js contains professionalCourses array');
            process.exit(1);
        }

        console.log(`📥 Seeding ${coursesData.length} courses...`);
        const courses = await Course.insertMany(coursesData);

        console.log(`✅ Successfully seeded ${courses.length} courses!`);
        console.log('\nSeeded courses:');
        courses.forEach((course, index) => {
            console.log(`  ${index + 1}. ${course.courseTitle}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();

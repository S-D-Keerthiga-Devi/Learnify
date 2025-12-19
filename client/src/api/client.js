import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        // Get Clerk session token
        const getToken = async () => {
            if (window.Clerk && window.Clerk.session) {
                try {
                    const token = await window.Clerk.session.getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error('Error getting Clerk token:', error);
                }
            }
            return config;
        };

        return getToken();
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error
            console.error('API Error:', error.response.data);

            if (error.response.status === 401) {
                console.error('Unauthorized - please sign in');
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Course API
export const courseAPI = {
    getAll: (params) => apiClient.get('/courses', { params }),
    getById: (id) => apiClient.get(`/courses/${id}`),
    getFeatured: (limit = 8) => apiClient.get('/courses/featured', { params: { limit } }),
};

// Enrollment API
export const enrollmentAPI = {
    enroll: (courseId) => apiClient.post('/enrollments', { courseId }),
    getMyEnrollments: () => apiClient.get('/enrollments'),
    unenroll: (courseId) => apiClient.delete(`/enrollments/${courseId}`),
    checkEnrollment: (courseId) => apiClient.get(`/enrollments/check/${courseId}`),
};

// Progress API
export const progressAPI = {
    getCourseProgress: (courseId) => apiClient.get(`/progress/${courseId}`),
    markLectureComplete: (courseId, chapterIndex, lectureIndex) =>
        apiClient.post(`/progress/${courseId}/lecture`, { chapterIndex, lectureIndex }),
    getStats: () => apiClient.get('/progress/stats'),
};

// User API
export const userAPI = {
    getMe: () => apiClient.get('/users/me'),
    updateProfile: (data) => apiClient.put('/users/me', data),
};

export default apiClient;

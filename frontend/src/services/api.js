import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const journalApi = {
  createEntry: (data) => api.post('/journal', data),
  getEntries: (userId, page = 1, limit = 20) => api.get(`/journal/${userId}?page=${page}&limit=${limit}`),
  getInsights: (userId) => api.get(`/journal/insights/${userId}`),
  analyzeText: (text) => api.post('/journal/analyze', { text })
};

export default api;


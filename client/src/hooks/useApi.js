import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Contact Messages
export const submitMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const markRead = (id) => api.patch(`/messages/${id}`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// Dynamic Site Content
export const getContent = () => api.get('/content');
export const getSectionContent = (section) => api.get(`/content/${section}`);
export const updateContent = (section, data) => api.put(`/content/${section}`, data);

// Dynamic Images
export const getImages = () => api.get('/images');
export const getSectionImages = (section) => api.get(`/images/section/${section}`);
export const uploadImage = (formData) => api.post('/images', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteImage = (id) => api.delete(`/images/${id}`);

export default api;


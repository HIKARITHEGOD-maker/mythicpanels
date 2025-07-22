import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000
});

export const getStories = () => API.get('/stories');
export const getStory = (id: string) => API.get(`/stories/${id}`);
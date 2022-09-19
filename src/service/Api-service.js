import axios from 'axios';

const API_KEY = '86ebc094564f402e3e71f206e3e7230a';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieDetails = async id => {
  const response = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieCredits = async id => {
  const response = await axios.get(`/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieReviews = async id => {
  const response = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
  return response.data;
};

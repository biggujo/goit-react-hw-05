import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDdmZTU4ZWJkMjMzZDY5Y2VlN2RjYTQ2ZWYwOGFlNiIsInN1YiI6IjY0YWE4Yzk0M2UyZWM4MDEyZWUzOWM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JlMf1XMEtVXHat5MkCciJRlAPG65by9hu8CeaKn8o0o';

const fetchMoviesTrending = async () => {
  const response = await axios.get('/trending/all/day');

  return response.data;
};

const fetchMoviesByQuery = async (query = '') => {
  const response = await axios.get(`/search/movie?query=${query}`);

  return response.data;
};

const fetchMovieDetailsById = async (id = '') => {
  const response = await axios.get(`/movie/${id}`);

  return response.data;
};

const fetchMovieCreditsById = async (id = '') => {
  const response = await axios.get(`/movie/${id}/credits`);

  return response.data;
};

const fetchMovieReviewsById = async (id = '') => {
  const response = await axios.get(`/movie/${id}/reviews`);

  return response.data;
};

export default {
  fetchMoviesTrending,
  fetchMoviesByQuery,
  fetchMovieDetailsById,
  fetchMovieCreditsById,
  fetchMovieReviewsById,
};

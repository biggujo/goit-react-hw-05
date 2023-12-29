import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import Api from '../utils/api';
import { Notify } from 'notiflix';

export default function TrendingPage() {
  const [trendingList, setTrendingList] = useState([]);
  const [isError, setIsError] = useState(false);

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const list = await Api.fetchMoviesTrending();

        setTrendingList(list.results);
      } catch (e) {
        Notify.failure(`Fetch error. Code: ${e.response.code}`);
      }
    };

    fetchMovies();
  }, []);

  return (<div>
    <h2>Trending page</h2>
    <MovieList movies={trendingList} />
  </div>);
}

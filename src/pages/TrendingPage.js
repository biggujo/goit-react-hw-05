import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { Status } from '../utils/status';

export default function TrendingPage() {
  const [trendingList, setTrendingList] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  // Fetch trending movies
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setStatus(Status.PENDING);
      console.log('Pending!');

      try {
        const list = await Api.fetchMoviesTrending(controller);

        setTrendingList(list.results);
        setStatus(Status.RESOLVED);
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          return;
        }

        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        setStatus(Status.REJECTED);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, []);

  return (<div>
    <h2>Trending page</h2>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieList movies={trendingList} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </div>);
}

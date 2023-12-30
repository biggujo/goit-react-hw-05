import React, { useEffect, useRef, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import { Status, useStatus } from '../hooks/useStatus';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';

export default function TrendingPage() {
  const [trendingList, setTrendingList] = useState(null);
  const {
    status,
    error,
    setError,
    statusSetIdle,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  // Fetch trending movies
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      statusSetPending();
      try {
        const list = await Api.fetchMoviesTrending(controller);

        setTrendingList(list.results);
        statusSetResolved();
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          statusSetIdle();
          return;
        }

        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        statusSetRejected();
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

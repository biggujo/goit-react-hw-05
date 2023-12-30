import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import { Status, useStatus } from '../hooks/useStatus';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';

export default function TrendingPage() {
  const [trendingList, setTrendingList] = useState([]);
  const {
    status,
    error,
    setError,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      statusSetPending();
      try {
        const list = await Api.fetchMoviesTrending();

        setTrendingList(list.results);
        statusSetResolved();
      } catch (e) {
        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        statusSetRejected();
      }
    };

    fetchMovies();
  }, []);

  return (<div>
    <h2>Trending page</h2>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieList movies={trendingList} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </div>);
}

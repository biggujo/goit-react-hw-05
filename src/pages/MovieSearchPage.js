import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix';
import SearchForm from '../components/SearchForm/SearchForm';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import MovieList from '../components/MovieList/MovieList';
import Api from '../utils/api';
import { Status } from '../utils/status';

const QUERY_KEY = 'query';

export default function MovieSearchPage() {
  const [resultsList, setResultsList] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get(QUERY_KEY) ?? '';

  useEffect(() => {
    if (query === '') {
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {

      try {
        setStatus(Status.PENDING);
        const list = await Api.fetchMoviesByQuery(query, controller);
        setResultsList(list.results);
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
  }, [query]);

  return (<div>
    <SearchForm queryKey={QUERY_KEY} />
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieList movies={resultsList} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </div>);
}

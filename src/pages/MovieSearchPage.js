import React, { useEffect, useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { useSearchParams } from 'react-router-dom';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import { Status, useStatus } from '../hooks/useStatus';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import MovieList from '../components/MovieList/MovieList';
import {
  isLabelWithInternallyDisabledControl,
} from '@testing-library/user-event/dist/utils';

const QUERY_KEY = 'query';

export default function MovieSearchPage() {
  const [resultsList, setResultsList] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QUERY_KEY) ?? '';
  const {
    status,
    error,
    setError,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  useEffect(() => {
    if (query === '') {
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {

      try {
        statusSetPending();
        const list = await Api.fetchMoviesByQuery(query, controller);
        setResultsList(list.results);
        statusSetResolved();
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          return;
        }

        console.log(e);
        Notify.failure(`Fetch error123. Code: ${e.request.status}`);
        setError(e.request.status);
        statusSetRejected();
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

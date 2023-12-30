import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import { Status, useStatus } from '../hooks/useStatus';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const { movieId } = useParams();
  const {
    status,
    error,
    setError,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  useEffect(() => {
    const fetchMovie = async () => {
      statusSetPending();
      try {
        const info = await Api.fetchMovieDetailsById(movieId);

        setMovieInfo(info);
        statusSetResolved();
      } catch (e) {
        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        statusSetRejected();
      }
    };

    fetchMovie();
  }, []);

  return (<>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieInfo info={movieInfo} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </>);
}

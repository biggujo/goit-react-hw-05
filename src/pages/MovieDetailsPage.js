import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import { Status, useStatus } from '../hooks/useStatus';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { IoMdArrowBack } from 'react-icons/io';
import { GoBackLinkStyled } from '../components/GoBackLink/GoBackLink.styled';

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const {
    status,
    error,
    setError,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      statusSetPending();
      try {
        const info = await Api.fetchMovieDetailsById(movieId);

        setMovieInfo(info);
        statusSetResolved();
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          return;
        }

        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        statusSetRejected();
      }
    };

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, []);

  return (<>
    <GoBackLinkStyled to={backLinkLocation.current}><IoMdArrowBack /> Go
      back</GoBackLinkStyled>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieInfo info={movieInfo} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </>);
}

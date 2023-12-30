import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Notify } from 'notiflix';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { GoBackLinkStyled } from '../components/GoBackLink/GoBackLink.styled';
import Api from '../utils/api';
import { Status } from '../utils/status';

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      setStatus(Status.PENDING);
      try {
        const info = await Api.fetchMovieDetailsById(movieId);

        setMovieInfo(info);
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

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (<>
    <GoBackLinkStyled to={backLinkLocation.current}><IoMdArrowBack /> Go
      back</GoBackLinkStyled>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <MovieInfo info={movieInfo} />}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </>);
}

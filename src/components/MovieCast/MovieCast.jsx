import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Notify } from 'notiflix';
import { ListItemStyled } from '../ListItem/ListItem.styled';
import CastItem from '../CastItem/CastItem';
import LoadingFallback from '../LoadingFallback/LoadingFallback';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import Api from '../../utils/api';
import { Status } from '../../utils/status';

export default function MovieCast() {
  const [castList, setCastList] = useState(null);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const fetchCast = async () => {
      try {
        setStatus(Status.PENDING);
        const cast = await Api.fetchMovieCreditsById(movieId, controller);

        setCastList(cast.cast);
        setStatus(() => Status.RESOLVED);
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          return;
        }

        Notify.failure(`Fetch error. Code: ${e.request.status}`);
        setError(e.request.status);
        setStatus(() => Status.REJECTED);
      }
    };

    fetchCast();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (<div>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && <ul>
      {castList.map((cast) => <ListItemStyled key={cast.id}>
        <CastItem info={cast} />
      </ListItemStyled>)}
    </ul>}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </div>);
}

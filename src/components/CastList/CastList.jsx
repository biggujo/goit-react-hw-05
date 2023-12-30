import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../utils/api';
import { Notify } from 'notiflix';
import { ListItemStyled } from '../ListItem/ListItem.styled';
import CastItem from '../CastItem/CastItem';
import { Status, useStatus } from '../../hooks/useStatus';
import LoadingFallback from '../LoadingFallback/LoadingFallback';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

export default function CastList() {
  const [castList, setCastList] = useState(null);
  const { movieId } = useParams();
  const {
    status,
    error,
    setError,
    statusSetIdle,
    statusSetPending,
    statusSetResolved,
    statusSetRejected,
  } = useStatus();

  useEffect(() => {
    const controller = new AbortController();

    const fetchCast = async () => {
      try {
        statusSetPending();
        const cast = await Api.fetchMovieCreditsById(movieId, controller);

        setCastList(cast.cast);
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

    fetchCast();

    return () => {
      controller.abort();
    };
  }, []);

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

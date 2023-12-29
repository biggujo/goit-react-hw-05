import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../utils/api';
import { Notify } from 'notiflix';
import { ListItemStyled } from '../ListItem/ListItem.styled';
import CastItem from '../CastItem/CastItem';

export default function CastList() {
  const [castList, setCastList] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await Api.fetchMovieCreditsById(movieId);

        setCastList(cast.cast);
      } catch (e) {
        Notify.failure(`Fetch error. Code: ${e.response.code}`);
      }
    };

    fetchCast();
  }, []);

  return (castList && <ul>
    {castList.map((cast) => <ListItemStyled>
      <CastItem info={cast} />
    </ListItemStyled>)}
  </ul>);
}

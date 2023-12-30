import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem/MovieItem';
import { ListItemStyled } from '../ListItem/ListItem.styled';

export default function MovieList({ movies }) {
  return (<ul>
    {movies.map(({
      id,
      name,
      title,
    }) => <ListItemStyled key={id}>
      <MovieItem id={id}
                 name={name === undefined ? title : name} />
    </ListItemStyled>)}
  </ul>);
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

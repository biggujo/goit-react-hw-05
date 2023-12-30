import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MovieItem({
  id,
  name,
}) {
  const location = useLocation();

  return (<Link to={`/movies/${id}`} state={{ from: location }}>
    {name}
  </Link>);
}

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

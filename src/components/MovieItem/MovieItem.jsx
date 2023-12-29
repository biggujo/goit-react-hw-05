import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MovieItem({
  id,
  name,
}) {
  return (<Link to={`/movies/${id}`}>
    {name}
  </Link>);
}

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

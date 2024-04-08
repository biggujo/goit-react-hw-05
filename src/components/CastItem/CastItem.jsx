import React from 'react';
import PropTypes from 'prop-types';
import MovieCast from '../MovieCast/MovieCast.jsx';

export default function CastItem({
  info: {
    original_name,
    profile_path,
    character,
  },
}) {
  return (<div>
    {profile_path &&
      <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
           alt={`${original_name}`}
           width='80' />}
    {!profile_path && <p>No photo</p>}
    <p>{original_name}</p>
    <p>Character: {character}</p>
  </div>);
}

MovieCast.propTypes = {
  info: PropTypes.shape({
    character: PropTypes.string.isRequired,
    original_name: PropTypes.string.isRequired,
    profile_path: PropTypes.string.isRequired,
  }),
};

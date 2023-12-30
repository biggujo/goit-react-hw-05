import React from 'react';
import PropTypes from 'prop-types';

export default function ReviewsItem({
  reviewData: {
    author,
    content,
  },
}) {
  return (<div>
    <b>Author: {author}</b>
    <p>{content}</p>
  </div>);
}

ReviewsItem.propTypes = {
  reviewData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),

};

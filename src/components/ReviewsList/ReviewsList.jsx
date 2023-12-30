import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../utils/api';
import { Notify } from 'notiflix';
import ReviewsItem from '../ReviewsItem/ReviewsItem';
import LoadingFallback from '../LoadingFallback/LoadingFallback';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import { Status } from '../../utils/status';

export default function ReviewsList() {
  const [reviewsList, setReviewsList] = useState(null);
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  // Fetch reviews from the back-end
  useEffect(() => {
    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        setStatus(Status.PENDING);
        const reviews = await Api.fetchMovieReviewsById(movieId, controller);

        if (reviews.results.length === 0) {
          setIsEmptyList(true);
        }

        setReviewsList(reviews.results);
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

    fetchReviews();

    return () => {
      controller.abort();
    };
  }, []);

  return (<div>
    {status === Status.PENDING && <LoadingFallback />}
    {status === Status.RESOLVED && isEmptyList &&
      <p>We don't have any reviews for this movie.</p>}
    {status === Status.RESOLVED && !isEmptyList &&
      <ul>{reviewsList.map((reviewData) => <li
        key={reviewData.id}>
        <ReviewsItem reviewData={reviewData} />
      </li>)}</ul>}
    {status === Status.REJECTED && <ErrorFallback error={error} />}
  </div>);
}

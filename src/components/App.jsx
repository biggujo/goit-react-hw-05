import {
  fetchMovieCreditsById,
  fetchMovieDetailsById,
  fetchMovieReviewsById,
  fetchMovies,
  fetchMoviesByQuery,
} from './utils/api';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    const fetch = async () => {
      // console.log(await fetchMovies());
      try {
        // console.log(await fetchMoviesByQuery('Mulholland Drive'));
        console.log(await fetchMovieReviewsById(1018));
      } catch (e) {
        console.log(e.response.status);
      }
    };

    fetch();
  }, []);

  return (<>
    <p>Hello, World!</p>
  </>);
};

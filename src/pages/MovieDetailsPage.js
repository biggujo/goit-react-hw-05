import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../utils/api';
import { Notify } from 'notiflix';
import MovieInfo from '../components/MovieInfo/MovieInfo';

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const info = await Api.fetchMovieDetailsById(movieId);

        setMovieInfo(info);
      } catch (e) {
        Notify.failure(`Fetch error. Code: ${e.response.code}`);
      }
    };

    fetchMovie();
  }, []);

  return (<>
    {movieInfo && <MovieInfo info={movieInfo} />}
  </>);
}

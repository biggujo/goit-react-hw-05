import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import {
  GenresListStyled, WrapperStyled,
} from './MovieInfo.styled';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import LoadingFallback from '../LoadingFallback/LoadingFallback';

export default function MovieInfo({
  info: {
    title,
    name,
    release_date,
    poster_path,
    vote_average,
    overview,
    genres,
  },
}) {
  // Get year
  const releaseDate = release_date.slice(0, 4);

  return (<>
    <WrapperStyled>
      <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
           alt={`Poster of ${title ?? name}`}
           width='300' />
      <div>
        <h2>{title} ({releaseDate})</h2>
        <p>User Score: {(vote_average * 10).toFixed(2)}%</p>

        <h3>Overview</h3>
        <p>{overview}</p>

        <h4>Genres</h4>
        <GenresListStyled>
          {genres.map(({
            id,
            name,
          }) => <li key={id}>
            {name}
          </li>)}
        </GenresListStyled>
      </div>
    </WrapperStyled>
    <AdditionalInfo />
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </>);
}

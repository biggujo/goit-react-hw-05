import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from '../../pages/TrendingPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import CastList from '../CastList/CastList';
import ReviewsList from '../ReviewsList/ReviewsList';
import MoviesPage from '../../pages/MovieSearchPage';

const Layout = lazy(() => import('../Layout/Layout'));

export const App = () => {
  return (<Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='movies' element={<MoviesPage />} />
      <Route path='movies/:movieId' element={<MovieDetailsPage />}>
        <Route path='cast' element={<CastList />} />
        <Route path='reviews' element={<ReviewsList />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  </Routes>);
};

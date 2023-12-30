import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import TrendingPage from '../../pages/TrendingPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import CastList from '../CastList/CastList';
import ReviewsList from '../ReviewsList/ReviewsList';

const Layout = lazy(() => import('../Layout/Layout'));

export const App = () => {
  return (<Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<TrendingPage />} />
      <Route path='movies' element={<p>Movies Search Page</p>} />
      <Route path='movies/:movieId' element={<MovieDetailsPage />}>
        <Route path='cast' element={<CastList />} />
        <Route path='reviews' element={<ReviewsList />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  </Routes>);
};

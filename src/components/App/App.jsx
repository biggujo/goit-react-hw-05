import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import LoadingFallback from '../LoadingFallback/LoadingFallback';

const HomePage = lazy(() => import('../../pages/TrendingPage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MovieSearchPage.jsx'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage.jsx'));
const CastList = lazy(() => import('../CastList/CastList.jsx'));
const ReviewsList = lazy(() => import('../ReviewsList/ReviewsList.jsx'));

export const App = () => {
  return (<Suspense fallback={<LoadingFallback />}>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='movies' element={<MoviesPage />} />
        <Route path='movies/:movieId' element={<MovieDetailsPage />}>
          <Route path='cast' element={<CastList />} />
          <Route path='reviews' element={<ReviewsList />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  </Suspense>);
};

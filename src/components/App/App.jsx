import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import TrendingPage from '../../pages/TrendingPage';

const Layout = lazy(() => import('../Layout/Layout'));

export const App = () => {
  return (<Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<TrendingPage />} />
      <Route path='movies' element={<p>Movies Search Page</p>} />
      <Route path='movies/:movieId' element={<p>A specific movie</p>}>
        <Route path='cast' element={<p>Cast</p>} />
        <Route path='reviews' element={<p>Cast</p>} />
      </Route>
    </Route>
  </Routes>);
};

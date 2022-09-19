import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from '../pages/HomePages/HomePage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />}>
          <Route path=":movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

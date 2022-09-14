import { useState, useEffect } from 'react';
import * as API from '../../service/Api-service';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const { results } = await API.getTrendingMovies();
        const movies = results.map(({ id, title }) => ({ id, title }));
        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}

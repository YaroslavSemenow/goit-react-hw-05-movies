import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../service/Api-service';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function fetchTrendingMovies() {
      try {
        const { results } = await API.getTrendingMovies();
        const movies = results.map(({ id, title }) => ({ id, title }));

        setIsLoading(false);
        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {trendingMovies && (
        <ul>
          {trendingMovies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

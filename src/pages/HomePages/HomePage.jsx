import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../service/Api-service';
import MoviesList from '../../components/MoviesList/MoviesList';
export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function fetchTrendingMovies() {
      try {
        const { results } = await getTrendingMovies();
        const movies = results.map(({ id, title }) => ({ id, title }));

        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>

      {trendingMovies && <MoviesList movies={trendingMovies} />}

      {isLoading && <p>Loading...</p>}

      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

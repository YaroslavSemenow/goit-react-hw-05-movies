import { useEffect, useState } from 'react';
import { searchMovies } from '../../service/Api-service';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState(null);
  const [isMovie, setIsMovie] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query');

  useEffect(() => {
    if (query === null) {
      return;
    }

    setIsMovie(true);
    setIsLoading(true);
    setMovies(null);

    async function fetchMovies() {
      try {
        const { results } = await searchMovies(query);

        if (results.length === 0) {
          setIsMovie(false);
          return;
        }

        const movies = results.map(({ id, title }) => ({ id, title }));
        setMovies(movies);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  const onInputChange = e => {
    setInputValue(e.target.value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    const normalizedInputValue = inputValue.trim();

    if (normalizedInputValue === '') {
      return;
    }

    setSearchParams({ query: normalizedInputValue });
    setInputValue('');
  };

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {!isMovie && <p>No results found for "{query}"</p>}

      {movies && <MoviesList movies={movies} />}

      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </>
  );
}

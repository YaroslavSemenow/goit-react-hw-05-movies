import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../../service/Api-service';

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [isMovie, setIsMovie] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === '') {
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

    setQuery(normalizedInputValue);
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

      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={id.toString()}>{title}</Link>
            </li>
          ))}
        </ul>
      )}

      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </>
  );
}

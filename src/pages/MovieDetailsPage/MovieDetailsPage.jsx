import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../service/Api-service';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function fetchMovieDetails() {
      try {
        const {
          poster_path,
          title,
          release_date,
          vote_average,
          overview,
          genres,
        } = await getMovieDetails(movieId);

        const img = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        const date = release_date.slice(0, 4);
        const scoreInPercentage = Math.round(vote_average * 10).toString();
        const genresNormalized = genres.map(genre => genre.name).join(' ');

        setIsLoading(false);
        setMovieDetails({
          img,
          title,
          date,
          scoreInPercentage,
          overview,
          genresNormalized,
        });
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  const OnGoBack = () => {
    navigate(location?.state?.from?.location ?? '/');
  };

  return (
    <div>
      <button className={styles.button} type="button" onClick={OnGoBack}>
        Go back
      </button>
      {movieDetails && <MovieCard movie={movieDetails} />}
      {isLoading && <p>Loading...</p>}
      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

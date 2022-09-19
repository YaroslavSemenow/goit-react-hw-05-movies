import { useEffect, useState } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../service/Api-service';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
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
        const scoreInPercentage = Math.round(vote_average * 10);
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

  return (
    <div>
      {movieDetails && (
        <>
          <div className={styles.card__main}>
            <img
              className={styles.card__img}
              src={movieDetails.img}
              alt={movieDetails.title}
              width="270"
              height="400"
            />
            <div>
              <h2>
                {movieDetails.title} ({movieDetails.date})
              </h2>
              <p>User Score: {movieDetails.scoreInPercentage}%</p>
              <h3>Owerview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <p>{movieDetails.genresNormalized}</p>
            </div>
          </div>
          <div className={styles.card__more}>
            <h4>Additional information</h4>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const { img, title, date, scoreInPercentage, overview, genresNormalized } =
    movie;

  return (
    <>
      <div className={styles.card__main}>
        <img
          className={styles.card__img}
          src={img}
          alt={title}
          width="270"
          height="400"
        />
        <div>
          <h2>
            {title} ({date})
          </h2>
          <p>User Score: {scoreInPercentage}%</p>
          <h3>Owerview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genresNormalized}</p>
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
  );
}

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

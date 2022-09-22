import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <>
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: { location } }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

MoviesList.propTypes = PropTypes.arrayOf(
  PropTypes.objectOf(PropTypes.string.isRequired).isRequired
).isRequired;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../service/Api-service';
import style from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function fetchMovieCredits() {
      try {
        const result = await getMovieCredits(movieId);
        const cast = result.cast.map(({ name, character, profile_path }) => {
          const img = profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : 'https://cdn.icon-icons.com/icons2/1812/PNG/512/4213460-account-avatar-head-person-profile-user_115386.png';
          return { name, character, img };
        });

        setCast(cast);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {cast && (
        <ul>
          {cast.map(({ name, character, img }) => (
            <li key={name} className={style.item}>
              <img src={img} alt={name} width="120" height="180" />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

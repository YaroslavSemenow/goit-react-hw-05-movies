import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../service/Api-service';

export default function Cast() {
  const [reviews, setReviews] = useState(null);
  const [isReviews, setIsReviews] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    async function fetchMovieCredits() {
      try {
        const { results } = await getMovieReviews(movieId);
        if (results.length === 0) {
          setIsReviews(false);
          return;
        }

        const reviews = results.map(({ id, author, content }) => ({
          id,
          author,
          content,
        }));

        setReviews(reviews);
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
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isReviews && <p>We don't have any reviews for this movie.</p>}
      {error && <p>Oops, something went wrong. Please, reload the page</p>}
    </div>
  );
}

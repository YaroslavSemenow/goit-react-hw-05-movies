import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.text}>
      This page was not found, please return to <Link to="/">home page</Link>
    </div>
  );
}

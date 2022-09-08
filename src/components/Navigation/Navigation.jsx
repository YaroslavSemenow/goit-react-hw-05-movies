import { NavLink } from 'react-router-dom';
import Container from 'components/Container/Container';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <Container>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => {
            console.log(styles.link + (isActive ? ' activeLink' : ''));
            return styles.link + (isActive ? styles.activeLink : '');
          }}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            styles.link + (isActive ? ' activeLink' : '')
          }
        >
          Movies
        </NavLink>
      </nav>
    </Container>
  );
}

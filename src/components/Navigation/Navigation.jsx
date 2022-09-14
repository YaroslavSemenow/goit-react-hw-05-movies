import { NavLink } from 'react-router-dom';
import Container from 'components/Container/Container';
import styles from './Navigation.module.css';

export default function Navigation() {
  const activePage = ({ isActive }) => {
    return `${styles.link} + ' ' + ${isActive ? styles.activeLink : ''}`;
  };

  return (
    <Container>
      <nav>
        <NavLink to="/" className={activePage}>
          Home
        </NavLink>

        <NavLink to="/movies" className={activePage}>
          Movies
        </NavLink>
      </nav>
    </Container>
  );
}

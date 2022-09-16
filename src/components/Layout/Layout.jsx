import styles from './Layout.module.css';
import Container from '../Container/Container';
import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <Container>
          <AppBar />
        </Container>
      </header>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

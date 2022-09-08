import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';

export const App = () => {
  return (
    <>
      <AppBar />

      <Container>
        <Routes>
          <Route></Route>
        </Routes>
      </Container>
    </>
  );
};

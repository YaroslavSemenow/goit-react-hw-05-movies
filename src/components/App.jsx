import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';
import HomePage from '../pages/HomePages/HomePage';

export const App = () => {
  return (
    <>
      <AppBar />

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </>
  );
};

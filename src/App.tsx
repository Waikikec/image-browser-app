import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import ImageDetails from './pages/ImageDetails';
import ImageList from './pages/ImageList';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<ImageList />} />
          <Route path="/details/:id" element={<ImageDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

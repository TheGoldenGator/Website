import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import NavBar from './components/NavBar';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <nav className="navbar">
          <NavBar />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

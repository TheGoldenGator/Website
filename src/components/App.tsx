import '../styles/App.css'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import NavBar from './NavBar'
import { createTheme, ThemeProvider } from '@mui/material'
import Members from './Members'
import { useEffect } from 'react'
import ReactGA from 'react-ga';

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

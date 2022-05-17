import './App.css';
import Home from './pages/Home';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from "./The_Golden_Gator_Logo.png";
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <Link to={{ pathname: "/" }}>
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
          <div className="menu">
            <li><Link to={{ pathname: "/" }}>Home</Link></li>
            {/* <li><Link to={{ pathname: "/members" }}>Members</Link></li> */}
            <li><Link to={{ pathname: "/about" }}>About</Link></li>
          </div>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/members" element={<Members />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

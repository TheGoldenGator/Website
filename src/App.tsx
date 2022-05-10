import './App.css';
import Home from './pages/Home';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from "./The_Golden_Gator_Logo.png";
import Members from './pages/Members';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img className="logo" src={Logo} alt="logo" />
        <div className="header-right">
          <Link to={{ pathname: "/" }}>
            <a className="active" href="#home">Home</a>
          </Link>
          <Link to={{ pathname: "/members" }}>
            <a href="#contact">Members</a>
          </Link>
          <a href="#about">About</a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
}

export default App;

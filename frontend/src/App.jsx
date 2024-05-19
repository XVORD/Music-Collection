import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MusicList from './components/MusicList';
import AddMusic from './components/AddMusic';
import EditMusic from './components/EditMusic';
import About from './pages/About'; // Import komponen About
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <header className="header">
                    <h1>Music Collection ♪♪♪</h1>
                    <nav className="navbar">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<MusicList />} />
                        <Route path="/add" element={<AddMusic />} />
                        <Route path="/edit/:id" element={<EditMusic />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

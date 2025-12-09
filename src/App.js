import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';  // Ubah BrowserRouter menjadi HashRouter
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import TvShows from './pages/TvShows';
import MovieDetail from './pages/MovieDetail';

const App = () => {
    return (
        <Router>  {/* Gunakan HashRouter di sini */}
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/tvshows" element={<TvShows />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

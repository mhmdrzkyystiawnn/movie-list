import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MoonLoader from 'react-spinners/MoonLoader';
import Footer from '../components/Footer';

const TvShows = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTvShows();
  }, []);

  const fetchTvShows = async () => {
    setIsLoading(true);
    setError(null);
    
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=tv show`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      console.error('Error fetching TV shows:', err);
      setError('Failed to load TV shows. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tvshows-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            TV
            <span className="hero-highlight"> Shows</span>
          </h1>
          <p className="hero-subtitle">
            Discover amazing TV shows and series from around the world
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="home-content">
        {/* Section Title */}
        {!isLoading && movies.length > 0 && (
          <div className="section-header">
            <h2 className="section-title">TV Shows Collection</h2>
            <p className="section-subtitle">
              {movies.length} {movies.length === 1 ? 'show' : 'shows'} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <MoonLoader size={60} color="#e85577" />
            <p>Loading TV shows...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchTvShows} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && movies.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📺</span>
            <h3>No TV shows found</h3>
            <p>Unable to load TV show content at this time</p>
            <button onClick={fetchTvShows} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {/* Movie List */}
        {!isLoading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TvShows;
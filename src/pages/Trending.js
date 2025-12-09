import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MoonLoader from 'react-spinners/MoonLoader';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError(null);
    
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError('Failed to load trending movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trending-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Trending
            <span className="hero-highlight"> This Week</span>
          </h1>
          <p className="hero-subtitle">
            Discover what everyone is watching right now
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="home-content">
        {/* Section Title */}
        {!isLoading && movies.length > 0 && (
          <div className="section-header">
            <h2 className="section-title">This Week's Hottest Movies</h2>
            <p className="section-subtitle">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} trending
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <MoonLoader size={60} color="#e85577" />
            <p>Loading trending movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchTrendingMovies} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && movies.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📈</span>
            <h3>No trending movies found</h3>
            <p>Unable to load trending content at this time</p>
            <button onClick={fetchTrendingMovies} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {/* Movie List */}
        {!isLoading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Trending;
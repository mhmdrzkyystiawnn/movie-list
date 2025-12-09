import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MoonLoader from 'react-spinners/MoonLoader';
import Footer from '../components/Footer';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (searchQuery = '') => {
    setIsLoading(true);
    setError(null);
    setIsSearching(!!searchQuery);
    
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsSearching(false);
    fetchMovies();
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Next
            <span className="hero-highlight"> Favorite Movie</span>
          </h1>
          <p className="hero-subtitle">
            Search from thousands of movies and find detailed information about your favorites
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for movies..."
                className="search-input"
              />
              {query && (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="clear-button"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button type="submit" className="search-button" disabled={!query.trim()}>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content Section */}
      <div className="home-content">
        {/* Section Title */}
        {!isLoading && movies.length > 0 && (
          <div className="section-header">
            <h2 className="section-title">
              {isSearching ? `Search Results for "${query}"` : 'Popular Movies'}
            </h2>
            <p className="section-subtitle">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <MoonLoader size={60} color="#e85577" />
            <p>Loading movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => fetchMovies()} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && movies.length === 0 && isSearching && (
          <div className="empty-state">
            <span className="empty-icon">🎬</span>
            <h3>No movies found</h3>
            <p>Try searching for something else</p>
            <button onClick={handleClear} className="retry-button">
              Show Popular Movies
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

export default Home;
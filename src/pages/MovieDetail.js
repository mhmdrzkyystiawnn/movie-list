import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      setIsLoading(true);
      setError(null);
      
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <MoonLoader size={60} color="#e85577" />
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error}</p>
        <Link to="/" className="btn-back">← Back to Home</Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <h2>Movie not found</h2>
        <p>The movie you're looking for doesn't exist.</p>
        <Link to="/" className="btn-back">← Back to Home</Link>
      </div>
    );
  }

  // PERBAIKAN: Gunakan process.env.PUBLIC_URL seperti di MovieCard
  const placeholder = process.env.PUBLIC_URL + '/images/no-image.jpeg';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholder;
  
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';

  return (
    <div className="movie-detail-page">
      {/* Backdrop */}
      {backdropUrl && (
        <div 
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      {/* Content Container */}
      <div className="movie-detail-container">
        {/* Back Button */}
        <Link to="/" className="btn-back">
          <span>←</span> Back to Home
        </Link>

        {/* Main Content */}
        <div className="movie-detail-content">
          {/* Poster */}
          <div className="movie-detail-poster">
            <img
              src={posterUrl}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />
          </div>

          {/* Info */}
          <div className="movie-detail-info">
            <h1 className="movie-title">
              {movie.title}
              <span className="movie-year"> ({releaseYear})</span>
            </h1>

            {/* Meta Info */}
            <div className="movie-meta">
              <span className="rating-badge">
                ⭐ {rating}
              </span>
              <span className="meta-item">{runtime}</span>
              <span className="meta-item">{movie.release_date}</span>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Tagline */}
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            {/* Overview */}
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            {/* Additional Info */}
            <div className="movie-additional-info">
              {movie.budget > 0 && (
                <div className="info-item">
                  <span className="info-label">Budget</span>
                  <span className="info-value">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="info-item">
                  <span className="info-label">Revenue</span>
                  <span className="info-value">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.status && (
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value">{movie.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="movie-detail-footer">
          <p>
            Data sourced from{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDb
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MovieDetail;
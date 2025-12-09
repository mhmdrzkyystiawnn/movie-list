import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    // Coba beberapa path yang berbeda
    const placeholder = process.env.PUBLIC_URL + '/images/no-image.jpeg';
    // Alternatif lain jika tidak berhasil:
    // const placeholder = '/images/no-image.jpeg';
    // const placeholder = require('../assets/no-image.jpeg');
    
    // Cek apakah movie punya poster_path, jika tidak gunakan placeholder
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : placeholder;

    // Format rating to 1 decimal place
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    // Get release year from release_date
    const year = movie.release_date 
        ? new Date(movie.release_date).getFullYear() 
        : 'TBA';

    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="movie-card">
                <div className="movie-card-image">
                    <img
                        src={imageUrl}
                        alt={movie.title || 'Movie poster'}
                        loading="lazy"
                        onError={(e) => {
                            // Jika gambar gagal load (error 404 atau broken link)
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = placeholder; // Set ke placeholder
                        }}
                    />
                </div>
                <div className="movie-card-content">
                    <h3>{movie.title}</h3>
                    <p className="movie-year">{year}</p>
                    {movie.vote_average > 0 && (
                        <div className="rating">⭐ {rating}</div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
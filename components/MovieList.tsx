'use client';

import { Movie } from '@/types/movie';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
  searchTerm: string;
  onDeleteMovie: (id: string) => Promise<void>;
  isLoading: boolean;
}

export default function MovieList({ movies, searchTerm, onDeleteMovie, isLoading }: MovieListProps) {
  const filteredMovies = movies.filter(movie =>
    movie.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.Genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await onDeleteMovie(id);
    }
  };

  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No movies yet. Add one to get started! 🎬</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Movie Collection</h2>
        <p className={styles.count}>
          {filteredMovies.length} of {movies.length} movies
        </p>
      </div>

      {filteredMovies.length === 0 ? (
        <p className={styles.noResults}>No movies match your search.</p>
      ) : (
        <div className={styles.grid}>
          {filteredMovies.map(movie => (
            <div key={movie.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{movie.Name}</h3>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className={styles.deleteBtn}
                  title="Delete movie"
                  disabled={isLoading}
                >
                  ✕
                </button>
              </div>

              <div className={styles.details}>
                {movie.Genre && (
                  <div className={styles.detail}>
                    <span className={styles.label}>Genre:</span>
                    <span>{movie.Genre}</span>
                  </div>
                )}
                {movie.Year && (
                  <div className={styles.detail}>
                    <span className={styles.label}>Year:</span>
                    <span>{movie.Year}</span>
                  </div>
                )}
                {movie.Rating && (
                  <div className={styles.detail}>
                    <span className={styles.label}>Rating:</span>
                    <span className={styles.rating}>
                      {'⭐'.repeat(movie.Rating)} {movie.Rating}/10
                    </span>
                  </div>
                )}
              </div>

              {movie.Notes && (
                <div className={styles.notes}>
                  <span className={styles.label}>Notes:</span>
                  <p>{movie.Notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

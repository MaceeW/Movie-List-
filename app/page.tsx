'use client';

import { useEffect, useState } from 'react';
import MovieForm from '@/components/MovieForm';
import MovieList from '@/components/MovieList';
import { Movie, MovieFormData } from '@/types/movie';
import styles from './page.module.css';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('/api/movies');
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please check your Airtable configuration.');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMovie = async (movieData: MovieFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) throw new Error('Failed to add movie');
      const newMovie = await response.json();
      setMovies([...movies, newMovie]);
    } catch (err) {
      setError('Failed to add movie. Please try again.');
      console.error('Error adding movie:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/movies?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete movie');
      setMovies(movies.filter(m => m.id !== id));
    } catch (err) {
      setError('Failed to delete movie. Please try again.');
      console.error('Error deleting movie:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>🎬 My Movie Collection</h1>
          <p>Track all the movies you own</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by movie name or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <MovieForm onAddMovie={handleAddMovie} isLoading={isLoading} />
        <MovieList
          movies={movies}
          searchTerm={searchTerm}
          onDeleteMovie={handleDeleteMovie}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

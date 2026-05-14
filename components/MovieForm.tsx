'use client';

import { useState } from 'react';
import { MovieFormData } from '@/types/movie';
import styles from './MovieForm.module.css';

interface MovieFormProps {
  onAddMovie: (movie: MovieFormData) => Promise<void>;
  isLoading: boolean;
}

export default function MovieForm({ onAddMovie, isLoading }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieFormData>({
    Name: '',
    Genre: '',
    Year: new Date().getFullYear(),
    Rating: 5,
    Notes: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Year' || name === 'Rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.Name.trim()) {
      setError('Movie name is required');
      return;
    }

    try {
      await onAddMovie(formData);
      setFormData({
        Name: '',
        Genre: '',
        Year: new Date().getFullYear(),
        Rating: 5,
        Notes: '',
      });
    } catch (err) {
      setError('Failed to add movie. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add a Movie</h2>
      
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="Name">Movie Name *</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="e.g., The Shawshank Redemption"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="Genre">Genre</label>
        <input
          type="text"
          id="Genre"
          name="Genre"
          value={formData.Genre}
          onChange={handleChange}
          placeholder="e.g., Drama, Action, Comedy"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="Year">Release Year</label>
          <input
            type="number"
            id="Year"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            min="1800"
            max={new Date().getFullYear() + 5}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="Rating">Your Rating</label>
          <select
            id="Rating"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num}/10
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="Notes">Notes</label>
        <textarea
          id="Notes"
          name="Notes"
          value={formData.Notes}
          onChange={handleChange}
          placeholder="Add any personal notes..."
          rows={3}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Movie'}
      </button>
    </form>
  );
}

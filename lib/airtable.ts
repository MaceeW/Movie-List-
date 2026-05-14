import Airtable from 'airtable';

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
});

const base = airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!);
const moviesTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Movies');

export interface Movie {
  id: string;
  Name: string;
  Genre: string;
  Year: number;
  Rating: number;
  Notes: string;
}

export async function getAllMovies(): Promise<Movie[]> {
  try {
    const records = await moviesTable.select().all();
    return records.map(record => ({
      id: record.id,
      Name: record.fields.Name as string || '',
      Genre: record.fields.Genre as string || '',
      Year: record.fields.Year as number || 0,
      Rating: record.fields.Rating as number || 0,
      Notes: record.fields.Notes as string || '',
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function createMovie(movie: Omit<Movie, 'id'>): Promise<Movie> {
  try {
    const records = await moviesTable.create([{ fields: movie }]);
    const record = records[0];
    return {
      id: record.id,
      Name: record.fields.Name as string || '',
      Genre: record.fields.Genre as string || '',
      Year: record.fields.Year as number || 0,
      Rating: record.fields.Rating as number || 0,
      Notes: record.fields.Notes as string || '',
    };
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
}

export async function deleteMovie(id: string): Promise<void> {
  try {
    await moviesTable.destroy([id]);
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}

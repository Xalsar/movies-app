/**
 * Interface representing a single movie genre.
 */
interface Genre {
  id: number;
  name: string;
}

/**
 * Interface representing a production company involved in the movie.
 */
interface ProductionCompany {
  id: number;
  logo_path: string | null; // Can be a string URL or null
  name: string;
  origin_country: string; // ISO 3166-1 country code (e.g., "US")
}

/**
 * Interface representing a country where the movie was produced.
 */
interface ProductionCountry {
  iso_3166_1: string; // ISO 3166-1 country code (e.g., "US")
  name: string;
}

/**
 * Interface representing a language spoken in the movie.
 */
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string; // ISO 639-1 language code (e.g., "en")
  name: string;
}

/**
 * Interface for the detailed movie object.
 */
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null; // Null in this example, but typically an object { id, name, poster_path, backdrop_path }
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[]; // Array of country codes
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string; // YYYY-MM-DD format
  revenue: number;
  runtime: number; // Runtime can sometimes be null
  spoken_languages: SpokenLanguage[];
  status: string; // e.g., "Released"
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

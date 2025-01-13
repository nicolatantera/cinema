export interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Films {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

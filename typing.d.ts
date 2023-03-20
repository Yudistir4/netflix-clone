import { DocumentData } from 'firebase/firestore';

export interface Genre {
  id: number;
  name: string;
}
type PlanType = 'mobile' | 'basic' | 'standard' | 'premium';

export interface UserDetail {
  id?: string;
  userID: string;
  hasPaid: boolean;
  signupSlideNumber: number;
  planType: PlanType;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface myMovieFirebase {
  userID: string;
  movie: Movie | DocumentData | null;
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser';
}

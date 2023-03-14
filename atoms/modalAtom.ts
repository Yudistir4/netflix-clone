import { Movie, myMovieFirebase } from './../typing.d';
import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';

export const modalState = atom({
  key: 'modalState',
  default: false,
});
export const searchState = atom({
  key: 'searchState',
  default: '',
});
export const volumeState = atom({
  key: 'volumeState',
  default: 0.5,
});
export const muteState = atom({
  key: 'muteState',
  default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
});
export const searchMoviesState = atom<Movie[] | DocumentData[] | null>({
  key: 'searchMoviesState',
  default: null,
});
export const myMoviesState = atom<myMovieFirebase[]>({
  key: 'myMoviesState',
  default: [],
});

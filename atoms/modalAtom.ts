import { Movie } from './../typing.d';
import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';

export const modalState = atom({
  key: 'modalState',
  default: false,
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

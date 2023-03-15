const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  search: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  fetchTvShowKorea: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=ko&page=1`,
  // fetchTvShowBarat: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=en&page=1
  fetchTvShowBarat: `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1&region=US&with_original_language=en&include_video=true`,
  fetchTvShowJapan: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_original_language=ja&include_video=true`,
  fetchTvShowIndia: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_original_language=hi|bn|mr|te|ta|gu|kn|ml|pa&include_video=true&with_watch_providers=8&with_watch_monetization_types=ads&year=2021`,
  fetchTvShowComedy: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1&with_genres=35&with_video=true`,
  fetchMovieAction: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchMovieAdventure: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=12`,
  fetchMovieAnimation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
  fetchMovieDrama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=18`,
  fetchMovieHistory: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,
  fetchMovieWar: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10770`,
};

export default requests;

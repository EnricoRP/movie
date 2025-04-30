import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { useEffect } from 'react';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fecthMovies = async (query = '') => {
    try {
      setIsLoading(true)
      const endpoint = query ? `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&query=${encodeURIComponent(query)}` :
        `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovieList(data.results); 
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(`Error fetching movies: ${error.message}`);
      setErrorMessage(`Error fetching movies: ${error.message}`);
    }
  }

  const fetchGenre = async () => {
    try {
      setIsLoading(true);
      const endpoint = `${API_BASE_URL}/genre/movie/list`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGenreList(data.genres);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(`Error fetching genre: ${error.message}`);
    }
  }

  // ✅ Fetch genre dan movies di awal
  useEffect(() => {
    fetchGenre();
    fecthMovies(); // atau fetchMovies(defaultKeyword) kalau kamu ada keyword awal
  }, []);

  // ⏳ Debounce saat input berubah
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔁 Fetch movie setelah debounce
  useEffect(() => {
    fecthMovies(debouncedValue); 
  }, [debouncedValue]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
              <ul>
                {movieList.length > 0 && (
                  movieList.map((movie) => (
                    <MovieCard key={movie.id} genres={genreList} movie={movie} />
                  ))
                )}
              </ul>
            )}
        </section>
      </div>
    </main>
  )
}

export default App

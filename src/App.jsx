import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { useEffect } from 'react';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use'; import { getTrendingMovie, updateSearchCount } from './utils/appwrite';
import TrendingMovieCard from './components/TrendingMovieCard';
import { fecthMovies } from './utils/movie';
'react-use';

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
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

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

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovie();
      setTrendingMovies(movies);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchGenre();
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    fecthMovies({
      query: { debouncedSearchTerm },
      setErrorMessage,
      setIsLoading,
      setMovieList
    });
  }, [debouncedSearchTerm]);

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
            setSearchTerm={setSearchTerm}
          />
        </header>

        {trendingMovies.length > 0 && (
          <TrendingMovieCard trendingMovies={trendingMovies} />
        )}
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

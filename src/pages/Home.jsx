import React from 'react' 
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'react-use'; 
import { getTrendingMovie, updateSearchCount } from '../utils/appwrite';
import TrendingMovieCard from '../components/TrendingMovieCard';
import { fecthMovies, fetchGenre } from '../utils/movie';
import { useState } from 'react'
import Search from '../components/Search';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovie();
            setTrendingMovies(movies);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchGenre({ setGenreList, setIsLoading, setErrorMessage });
        loadTrendingMovies();
    }, []);

    useEffect(() => {
        fecthMovies({
            query: debouncedSearchTerm,
            setErrorMessage,
            setIsLoading,
            setMovieList,
            updateSearchCount
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

export default Home

import { updateSearchCount } from "./appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export const fecthMovies = async ({ query = '', setIsLoading, setMovieList, setErrorMessage, updateSearchCount }) => {
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

        if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
        }

        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        console.error(`Error fetching movies: ${error.message}`);
        setErrorMessage(`Error fetching movies: ${error.message}`);
    }
}

export const fetchGenre = async ({ setGenreList, setIsLoading, setErrorMessage }) => {
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

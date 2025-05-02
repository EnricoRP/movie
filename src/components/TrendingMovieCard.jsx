import React from 'react'
import { Link } from 'react-router-dom'

const TrendingMovieCard = ({ trendingMovies }) => {
    return (
        <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                        <p>{index + 1}</p>
                        <Link to={`/movie/${movie.$id}`}>
                            <img src={movie.poster_url} alt={movie.title} />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default TrendingMovieCard

import React from 'react'

const MovieCard = ({ genres, movie: { title, vote_average, poster_path, original_language, release_date, genre_ids } }) => {
    return (
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title} />

            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star Icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <p className="lang"><span>•</span> {original_language}</p>
                    <p className="year"><span>•</span> {release_date ? release_date.split('-')[0] : 'N/A'}</p>
                    {Array.isArray(genres) && genres.length > 0 && Array.isArray(genre_ids) && genre_ids.length > 0 && (
                        <p className='genre'><span>• </span>{genres.find(g => g.id === genre_ids[0])?.name || 'Unknown'}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCard

import React from 'react'

const Search = ({ searchTerm, onChange }) => {
    return (
        <div className="search">
            <div>
                <img src='search.svg' alt='search' />
                <input
                    type='text'
                    placeholder='Search movie...'
                    value={searchTerm}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Search

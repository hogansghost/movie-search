import React, { useState } from 'react';
import styled from 'styled-components'

const apiKey = 'b7c038df266d0ae6c47d087f525c876f';

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid crimson;
    color: crimson;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

export const SearchResults = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, minmax(0px, 200px));
`;

export default function SearchMovies({

}) {
    const [query, setQuery] = useState('The thing');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (evt) => {
        evt.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const config = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
            const res = await fetch(url);
            const data  = await res.json();

            window.config = await config.json();
console.log(window.config);
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    };

    const onChangeHandler = (evt) => {
        // throttle
        setQuery(evt.target.value);
    };

    return (
        <div>
            <form className="form" onSubmit={searchMovies}>
                <h1>Search movies</h1>

                <label className="label" htmlFor="query"></label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query}
                    onChange={onChangeHandler}
                />

                <Button
                    className="button"
                    type="submit"
                >
                    Search
                </Button>
            </form>
          <SearchResults>

            { (movies || []).map((movie) => (
              <div key={movie.id}>
                    <img src={`${window.config.images.base_url}${window.config.images.poster_sizes[0]}${movie.poster_path}`} />
                    <p>{movie.title}</p>
                </div>
            ))}
            </SearchResults>
        </div>
    )
}
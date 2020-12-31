import React from 'react'
import Header from '../component/Header'
import { Container } from '@material-ui/core';
import SearchPage from './SearchPage';
import NominationPage from './NominationPage';

export default function Main(){   
    const [searchPage, setSearchPage] = React.useState(true);   
    const [movieList, setMovieList] = React.useState([]); 
    const [searchResult, setSearchResult] = React.useState();

    const render = {
        renderSearch : () => {if (!searchPage) setSearchPage(true)},
        renderNomination: () => {if (searchPage) setSearchPage(false)}
    }

    const addMovie = (newMovie) => {
        let containsMovie = false;
        console.log(newMovie);
        movieList.forEach(movie => {if (movie.imdbID === newMovie.imdbID) containsMovie = true});
        if (containsMovie) {
            alert("You have aleardy nominated this movie"); 
            return;
        }
        movieList.push(newMovie);
        setMovieList(movieList);        
    }

    const updateSearchResult = (data) => {
        setSearchResult(data);
    }

    const removeMovie = (data) => {
        setMovieList(movieList.filter(movie => movie.imdbID !== data.imdbID));
    }
    
    const page = searchPage? <SearchPage addMovie={addMovie} updateSearchResult={updateSearchResult} searchResult={searchResult} /> : <NominationPage movieList={movieList} removeMovie={removeMovie} />;

    return (
        <Container>    
            <Header render={render}/> 
            {page}             
        </Container>
    )
}
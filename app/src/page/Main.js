import React from 'react'
import Header from '../component/Header'
import { Container, Typography } from '@material-ui/core';
import SearchPage from './SearchPage';
import NominationPage from './NominationPage';

export default function Main(){       
    const [searchPage, setSearchPage] = React.useState(true);   
    const [movieList, setMovieList] = React.useState(localStorage.getItem('movieList') ? JSON.parse(localStorage.getItem('movieList')) : []); 
    const [searchResult, setSearchResult] = React.useState();

    const render = {
        renderSearch : () => {if (!searchPage) setSearchPage(true)},
        renderNomination: () => {if (searchPage) setSearchPage(false)}
    }

    const addMovie = (newMovie) => {        
        if (containsMovie(newMovie)) {
            alert("You have aleardy nominated this movie"); 
            return;
        }
        movieList.push(newMovie);
        setMovieList(movieList);        
    }

    const containsMovie = (newMovie) => {
        let contained = false;        
        movieList.forEach(movie => {if (movie.imdbID === newMovie.imdbID) contained = true});
        return contained;
    }

    const updateSearchResult = (data) => {
        setSearchResult(data);
    }

    const removeMovie = (data) => {
        setMovieList(movieList.filter(movie => movie.imdbID !== data.imdbID));
    }

    const saveMovieList = () => {
        localStorage.setItem('movieList', JSON.stringify(movieList));
    }
    
    const page = searchPage ? 
        <SearchPage addMovie={addMovie} movieList={movieList} updateSearchResult={updateSearchResult} searchResult={searchResult} containsMovie={containsMovie} /> : 
        <NominationPage movieList={movieList} removeMovie={removeMovie} save={saveMovieList} />;

    return (
        <Container>    
            <Header render={render}/> 
            {page}          
            {movieList.length >= 5 && (
                <Typography>You have Nominated {movieList.length} Movies!</Typography>
            )}   
        </Container>
    )
}
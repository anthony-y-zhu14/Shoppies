import React from 'react'
import Header from '../component/Header'
import SearchPage from './SearchPage';
import NominationPage from './NominationPage';
import Alert from '@material-ui/lab/Alert'
import {  Snackbar } from '@material-ui/core';


export default function Main(){       
    const [searchPage, setSearchPage] = React.useState(true);   
    const [movieList, setMovieList] = React.useState(localStorage.getItem('movieList') ? JSON.parse(localStorage.getItem('movieList')) : []); 
    const [searchResult, setSearchResult] = React.useState();    
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();
    const [message, setMessage] = React.useState();

    const render = {
        renderSearch : () => {if (!searchPage) setSearchPage(true)},
        renderNomination: () => {if (searchPage) setSearchPage(false)}
    }

    const saveMovieList = () => {
        localStorage.setItem('movieList', JSON.stringify(movieList));     
        setAlert('success');
        setMessage('Saved');
        setOpen(true);
    }

    const downloadMovieList = () => {
        let filename = "nominations.json";
        let contentType = "application/json;charset=utf-8;";        
        const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(movieList, null, 4)))], { type: contentType });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
	    a.href = url;
	    a.download = filename;
	    a.click();

    }

    const addMovie = (newMovie) => {        
        if (containsMovie(newMovie)) {
            setAlert('warning');
            setMessage(`${newMovie.Title} has already been nominated`);
            setOpen(true);
            return;
        }
        setAlert('success');
        setMessage('Sucessfully Nominated');
        setOpen(true);
        movieList.push(newMovie);
        setMovieList(movieList);        
    }

    const removeMovie = (data) => {
        setMovieList(movieList.filter(movie => movie.imdbID !== data.imdbID));
        setAlert('success');
        setMessage(`${data.Title} has been removed from Nomination`);
        setOpen(true);
    }

    const containsMovie = (newMovie) => {
        let contained = false;        
        movieList.forEach(movie => {if (movie.imdbID === newMovie.imdbID) contained = true});
        return contained;
    }

    const updateSearchResult = (data) => {
        console.log(data);
        if (!data.Search) {
            setAlert('warning');
            setMessage("Couldn't find any movie with that search term, please try again");
            setOpen(true);
        }
        setSearchResult(data);
    }  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      }
    
    const page = searchPage ? 
        <SearchPage addMovie={addMovie} movieList={movieList} updateSearchResult={updateSearchResult} searchResult={searchResult} containsMovie={containsMovie} /> : 
        <NominationPage movieList={movieList} removeMovie={removeMovie} save={saveMovieList} download={downloadMovieList}/>;

    return (
        <React.Fragment>    
            <Header render={render}/>   
            {page}    
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} autoHideDuration={2000} open={open} onClose={handleClose}>
              <Alert onClose={handleClose} severity={alert}>{message}</Alert>  
            </Snackbar>           
        </React.Fragment>
    )
}
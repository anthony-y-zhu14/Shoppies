import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom';
import { List, ListItem, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: '100px',
      textAlign: 'center',
      
    },
    content: {   
      margin: '20px auto',
      width: "60%",
      padding: '40px',
      color: "black",  
      background: "rgba(250, 250, 250, 0.4)",
      backdropFilter: 'blur(8px)', 
      textAlign: 'center',
      borderRadius: '30px',
      border: "1px solid rgb(255, 255, 255, 0.2)"
    },
    input: {
      margin: "2% auto"   
    },
  }));
const OMDB_API = "http://www.omdbapi.com/?i=tt3896198&apikey=c480e84f";

  export default function SearchPage(action) {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState();

    const searchBtn = () => {
      return(
        <InputAdornment>
          <IconButton onClick={handleSearch}>
            <SearchIcon color='secondary'/>
          </IconButton>
        </InputAdornment>
      )
    }    

    const handleSearch = () => {
      if (!searchTerm){
        alert('Please enter a movie title');
        return;
      }
      fetchAPI().then(res => action.updateSearchResult(res));   
    }

    const handleAdd = (movie) => {
      action.addMovie(movie);
    }

    const fetchAPI = async () => {
      let url = OMDB_API + `&s=${searchTerm}`;
      const response = await fetch(url);
      const body = await response.json();
      return body;
    };

    const displaySearchResult = () => {     
      if (action.searchResult && action.searchResult.Search) return (    
        <Zoom in={true}>     
          <List>
                {action.searchResult.Search.map(movie => (
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar src={movie["Poster"]}/>
                  </ListItemAvatar>
                  <ListItemText primary={movie["Title"]} secondary={movie["Year"]} />
                  <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="add" onClick={() => handleAdd(movie)}>
                        <AddIcon/>
                      </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                ))}  
          </List>    
        </Zoom>    
      )};

    return(   
      <Zoom in={true} style={{ transitionDelay: '400ms' }}>      
        <main className={classes.root}>          
            <div className={classes.content}>
              <TextField fullWidth={true} className={classes.input} variant='outlined' type='input' placeholder='Movie Title' helperText='Please enter a movie title' InputProps={{ startAdornment: searchBtn()}}
                onChange = {(e) => setSearchTerm(e.target.value)}>  
              </TextField> 
              {displaySearchResult()}                 
            </div>                     
        </main>  
      </Zoom>            
    );
}
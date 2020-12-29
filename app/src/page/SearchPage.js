import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade';
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
      width: "40%",
      padding: '40px',
      color: "black",  
      background: "rgba(250, 250, 250, 0.4)",
      backdropFilter: 'blur(8px)', 
      textAlign: 'center',
      borderRadius: '30px',
      border: "1px solid rgb(255, 255, 255, 0.2)"
    },
  }));
const OMDB_API = "http://www.omdbapi.com/?i=tt3896198&apikey=c480e84f";

  export default function SearchPage() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState();
    const [searchResult, setSearchResult] = React.useState();
    const searchBtn = () => {
      return(
        <InputAdornment>
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      )
    }    
    const handleSearch = () => {
      if (!searchTerm){
        alert('Please enter a movie title');
        return;
      }
      fetchAPI().then(res => setSearchResult(res)).finally(console.log(searchResult))      
    }

    const fetchAPI = async () => {
      let url = OMDB_API + `&s=${searchTerm}`;
      const response = await fetch(url);
      const body = await response.json();
      return body;
    };

    const displaySearchResult = () => {
    
      if (searchResult && searchResult.Search) return (      
        <List>
              {searchResult.Search.map(movie => (
                <ListItem>
                <ListItemAvatar>
                  <Avatar src={movie["Poster"]}/>
                </ListItemAvatar>
                <ListItemText primary={movie["Title"]} secondary={movie["Year"]} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <AddIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              ))}  
        </List>      
      )};

    return(   
      <Fade in={true} timeout={1000}>          
        <main className={classes.root}>          
            <TextField variant='outlined' type='input' placeholder='Movie Title'  InputProps={{ startAdornment: searchBtn()}}
              onChange = {(e) => setSearchTerm(e.target.value)}>  
            </TextField> 
            <div className={classes.content}>
              {displaySearchResult()}                 
            </div>                     
        </main>  
      </Fade>            
    );
}
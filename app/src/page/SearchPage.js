import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom';
import { List, ListItem, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { blue } from '@material-ui/core/colors';



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
      background: "rgba(200, 200, 200, 0.4)",
      backdropFilter: 'blur(8px)', 
      textAlign: 'center',
      borderRadius: '30px',
      border: "1px solid rgb(255, 255, 255, 0.2)"
    },
    input: {
      margin: "8px auto",
      color: 'black'   
    },
    avatar: {
      color: theme.palette.getContrastText(blue['A100']),
      backgroundColor: blue['A100'],
    },
  }));
  
const OMDB_API = "https://www.omdbapi.com/?i=tt3896198&apikey=c480e84f";

  export default function SearchPage(action) {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState();
    const [input, setInput] = React.useState();

    const searchBtn = () => {
      return(
        <InputAdornment>
          <IconButton onClick={handleSearch}>
            <SearchIcon color='secondary'/>
          </IconButton>
        </InputAdornment>
      )
    }   
    
    const clearBtn = () => {
      return(
        <InputAdornment>
          <IconButton onClick={clearInput}>
            <HighlightOffIcon color='secondary'/>
          </IconButton>
        </InputAdornment>
      )
    } 

    const clearInput = () => setInput('');

    const handleSearch = () => {
      if (!input){
        alert('Please enter a movie title');
        return;
      }
      fetchAPI().then(res => action.updateSearchResult(res));
      setSearchTerm(input);   
    }

    const handleAdd = (movie) => {
      action.addMovie(movie);      
    }

    const fetchAPI = async () => {
      let url = OMDB_API + `&s=${input}`;
      const response = await fetch(url);
      const body = await response.json();
      return body;
    };

    const displaySearchResult = () => {  
      if (action.searchResult && !action.searchResult.Search) return (<Typography variant='h5' color='secondary'>{`No Resut Found for ' ${searchTerm} '`}</Typography>)   
      if (action.searchResult && action.searchResult.Search) return (            
        <Zoom in={true}>   
          <List>            
            {!searchTerm && <Typography variant='h5' color='secondary'>Previous Search Result</Typography>}
            {searchTerm && <Typography variant='h5' color='secondary'>{`Search Result for ' ${searchTerm} '`}</Typography>}
            {action.searchResult.Search.map(movie => (
              <ListItem>
              <ListItemAvatar>
                <Avatar alt={movie["Title"]} src={movie["Poster"]} className={classes.avatar}/>
              </ListItemAvatar>
              <ListItemText primary={movie["Title"]} secondary={movie["Year"]}/>
              <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="add" disabled={action.containsMovie(movie)} onClick={() => { handleAdd(movie) }}>
                    <MovieFilterIcon />                        
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
              <TextField fullWidth={true} className={classes.input} variant='outlined' type='input' placeholder='Please enter a movie title' InputProps={{ startAdornment: searchBtn(), endAdornment: clearBtn() }}
                value={input} onChange = {(e) => setInput(e.target.value)} onKeyPress={(e) => {if (e.key === 'Enter') handleSearch()}} >  
              </TextField> 
              {displaySearchResult()}                        
            </div>      
                           
        </main>  
      </Zoom>            
    );
}
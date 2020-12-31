import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { List, ListItem } from '@material-ui/core';

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


export default function NominationPage(data) {
    const classes = useStyles();

    return (   
      <Zoom in={true} style={{ transitionDelay: '400ms' }}>         
        <main className={classes.root}>          
            <p>Nomination Page</p>
            <div className={classes.content}>
            <Zoom in={true}>     
              <List>
                    {data.movieList && data.movieList.map(movie => (
                      <ListItem>
                      <ListItemAvatar>
                        <Avatar src={movie["Poster"]}/>
                      </ListItemAvatar>
                      <ListItemText primary={movie["Title"]} secondary={movie["Year"]} />    
                      <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="add" onClick={() => data.removeMovie(movie)}>
                        <DeleteIcon />
                      </IconButton>
                      </ListItemSecondaryAction>             
                    </ListItem>
                    ))}  
              </List>    
            </Zoom>  
            </div>                     
        </main>  
      </Zoom>            
    );
}
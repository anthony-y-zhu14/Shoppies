import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { Button, List, ListItem, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

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
    button: {
      margin: '20px'
    },
  }));


export default function NominationPage(data) {
    const classes = useStyles();

    const movieList = (
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
    );

    return (   
      <Zoom in={true} style={{ transitionDelay: '400ms' }}>         
        <main className={classes.root}>       
            <div className={classes.content}>                            
              <Typography variant='h5'>Nominations</Typography> 
              <br/>
              {data.movieList.length >= 5 && 
              <React.Fragment marginTop='100px'>
                  <Alert color='primary' variant='filled' severity={'success'}>You have nominated more than five movies!</Alert>
              </React.Fragment>
              }  
              {movieList}
            </div>
            <div>  
              <Button className={classes.button} variant='contained' size='large' color='primary' onClick={()=>data.save()}>Save</Button>       
              <Button className={classes.button} variant='contained' size='large' onClick={()=>data.download()}>Download</Button>  
            </div>                
        </main>  
      </Zoom>            
    );
}
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom';

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


export default function NominationPage() {
    const classes = useStyles();

    return (   
      <Zoom in={true} style={{ transitionDelay: '400ms' }}>         
        <main className={classes.root}>          
            <p>Nomination Page</p>
            <div className={classes.content}>
            <p>Nomination Page</p>          
            </div>                     
        </main>  
      </Zoom>            
    );
}
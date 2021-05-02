import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin:'0 auto',
    marginTop:50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
      color:'#3f51b5'
  }
}));

export default function InfoPanel() {
 
    const [datafromAPI,setdatafromAPI]=useState({});

    useEffect(()=>{async function getData()
    {

    const response= await fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats");

    let dataF=await response.json();
 

       setdatafromAPI(dataF["data"]);

       
      console.log(dataF["data"]);
     
    }
    getData();
    
}, [])

  const classes = useStyles();

  return (
    <div className={classes.root}>

    <Grid container spacing={3}>

       {Object.keys(datafromAPI).map((key,ind)=>{
           return(

            <Grid item xs={12} sm={4} key={ind}>
            <Paper className={classes.paper}
            elevation={5}>
                <h3 className={classes.title}>
                    {key.replace(/_/g,' ').toLocaleUpperCase()}</h3>

                <h3>{datafromAPI[key]}</h3>
                </Paper>
          </Grid>

           );
       })} 

    </Grid>

    </div>
  );
}

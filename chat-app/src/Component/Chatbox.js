import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    height: "100vh",
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "7px auto",
    maxWidth: 500,
    boxShadow: "1px 1px 5px black",
    background:
      "linear-gradient(135deg, rgba(252,255,244,1) 0%,rgba(223,229,215,1) 40%,rgba(179,190,173,1) 100%)"
  },
  container: {
    height: "80vh",
    overflow: "auto",
    position: "relative",
    background:
      "linear-gradient(135deg, rgba(244,246,255,1) 0%,rgba(220,221,234,1) 40%,rgba(153,151,191,1) 100%)"
  },

  name: {
    fontWeight: "bold",
    fontSize: "2em"
  },
  text: {
    fontSize: "1.5em",
    overflow: "none"
  }
}));

const Chatbox = () => {
  const [data, setData] = useState([]);
  const [hasError, setError] = useState({});
  const classes = useStyles();
  const listRef = useRef();

  const scrollToBottom = () => {
    listRef.current.scrollIntoView();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/comments")
      .then(res => setData(res.data))
      .catch(error => setError(error));
    scrollToBottom();
  }, [data]);

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        {data.map(item => (
          <Paper className={classes.paper} key={item.username}>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography gutterBottom className={classes.name}>
                  {item.name}
                </Typography>
                <Typography gutterBottom className={classes.text}>
                  {item.text}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.dateAdded}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <div ref={listRef} />
      </Container>
    </div>
  );
};
export default Chatbox;

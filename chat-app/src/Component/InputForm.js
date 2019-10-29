import React, { useState } from "react";
import axios from "axios";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  form: {
    height: "15vh",
    paddingTop: "5vh",
    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%,rgba(241,241,241,1) 28%,rgba(241,241,241,1) 28%,rgba(225,225,225,1) 51%,rgba(246,246,246,1) 100%)',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: "1.5em"
  },
  margin: {
    margin: theme.spacing(1)
  },
  name: {
    margin: theme.spacing(1)
  },
  message: {
    width: "50%",
    height: "50%",
    margin: theme.spacing(1)
  }
}));

const InputForm = () => {
  const [name, setUser] = useState("");
  const [text, setText] = useState("");

  function createComment(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/comments", {
        name: name,
        text: text
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <form>
        <ThemeProvider>
          <TextField
            className={classes.name}
            label="Username"
            variant="outlined"
            id="mui-theme-provider-standard-input"
            type="text"
            name="name"
            onChange={e => setUser(e.target.value)}
            value={name}
          />
          <TextField
            className={classes.message}
            label="Message"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            type="text"
            name="text"
            onChange={e => setText(e.target.value)}
            value={text}
          />
        </ThemeProvider>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          onClick={e => {
            createComment(e);
          }}
        >
          Send{" "}
        </Button>
      </form>
    </div>
  );
};
export default InputForm;

import React from "react";

import { makeStyles } from "@material-ui/core/styles";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function New() {
  const classes = useStyles();
  return (
    <div className="container">
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <AddCircleIcon style={{ fontSize: 50 }} color="secondary" />
          <Typography component="h1" variant="h5">
            New Menu
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Name"
            name="Name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Description"
            label="Description"
            name="Description"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </div>
      </Container>
      <style jsx>
        {`
          .container {
            position: relative;
            height: 100vh;
            width: 100vw;
          }
        `}
      </style>
    </div>
  );
}

export default New;

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

import { firestore, auth } from "../utils/firebaseInit";
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from "../utils/firebaseUtility";

import Router from "next/router";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

console.log(publicRuntimeConfig);

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

  const [nameValue, setNameValue] = React.useState<string>("");
  const [descriptionValue, setDescriptionValue] = React.useState<string>("");

  const handleChangeNameValue = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleDescriptionValue = (e: any) => {
    setDescriptionValue(e.target.value);
  };

  const saveMenu = () => {
    console.log(nameValue);
    console.log(descriptionValue);

    const userId = localStorage.getItem(publicRuntimeConfig.localStorageUserId);
    const dataId = localStorage.getItem(publicRuntimeConfig.localStorageDataId);
    console.log(publicRuntimeConfig.localStorageUserId);
    console.log(publicRuntimeConfig.localStorageDataId);
    console.log(userId);
    console.log(dataId);

    if (dataId) {
      firestore
        .collection("users")
        .doc(dataId)
        .collection("menus")
        .add({ menuName: nameValue, description: descriptionValue })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          Router.push(`/edit/${docRef.id}`);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  };

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
            onChange={handleChangeNameValue}
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
            onChange={handleDescriptionValue}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveMenu}
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

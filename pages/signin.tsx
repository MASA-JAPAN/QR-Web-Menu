import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//method
import getConfig from "next/config";
import Router from "next/router";
import { auth, firebase, firestore } from "../utils/firebaseInit";
import {
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
} from "../utils/firebaseUtility";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const { publicRuntimeConfig } = getConfig();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        Router.push("/");
      }

      setLoggedIn(true);
    });
  });

  const [loggedIn, setLoggedIn] = React.useState(false);

  const classes = useStyles();

  const authenticateGoogle = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(authProvider).then((result) => {
      if (result.user) {
        const authUser = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,

          photo: result.user.photoURL,
        };
        authHandler(authUser);
      }
    });
  };

  const authHandler = (authUser: any) => {
    // check if user exists in users collection
    fetchDocumentFromCollectionByFieldName({
      collectionName: "users",
      fieldName: "uid",
      value: authUser.uid,
    }).then((foundUser: any) => {
      if (isEmpty(foundUser)) {
        // it is an empty object
        // add the user to users collection and go to home page

        firestore
          .collection("users")
          .add(authUser)
          .then((createdUser) => {
            console.log(authUser.uid);
            console.log(createdUser.id);

            localStorage.setItem(
              publicRuntimeConfig.localStorageUserId,
              authUser.uid
            );
            localStorage.setItem(
              publicRuntimeConfig.localStorageDataId,
              createdUser.id
            );
            Router.push("/mypage");
          });
      } else {
        // if yes, go to home page

        console.log(foundUser);
        console.log(foundUser.id);

        localStorage.setItem(
          publicRuntimeConfig.localStorageUserId,
          foundUser.uid
        );
        localStorage.setItem(
          publicRuntimeConfig.localStorageDataId,
          foundUser.id
        );
        Router.push("/mypage");
      }
    });
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button
            variant="contained"
            startIcon={"G"}
            style={{ color: "#fff", backgroundColor: "#a32b1c" }}
            fullWidth
            className={classes.button}
            onClick={authenticateGoogle}
          >
            Login with Google
          </Button>

          <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            style={{ color: "#fff", backgroundColor: "#3b5998" }}
            fullWidth
            className={classes.button}
          >
            Login with Facebook
          </Button>

          <Button
            variant="contained"
            startIcon={<TwitterIcon />}
            style={{ color: "#fff", backgroundColor: "#1583d7" }}
            fullWidth
            className={classes.button}
          >
            Login with Twitter
          </Button>

          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            style={{ color: "#fff", backgroundColor: "#444" }}
            fullWidth
            className={classes.button}
          >
            Login with Github
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

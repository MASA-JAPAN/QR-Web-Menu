import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

import { makeStyles } from "@material-ui/core/styles";

const { publicRuntimeConfig } = getConfig();

function signin() {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/");
      }
    });
  });

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
            localStorage.setItem(
              publicRuntimeConfig.localStorageUserId,
              createdUser.id
            );
            Router.push("/");
          });
      } else {
        // if yes, go to home page
        localStorage.setItem(
          publicRuntimeConfig.localStorageUserId,
          foundUser.id
        );
        Router.push("/");
      }
    });
  };

  return (
    <div className="container">
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
        </Toolbar>
      </AppBar>

      <div className="buttonGroup">
        <Button
          variant="contained"
          startIcon={"G"}
          style={{ color: "#fff", backgroundColor: "#a32b1c" }}
          onClick={authenticateGoogle}
        >
          Login with Google
        </Button>

        <Button
          variant="contained"
          startIcon={<FacebookIcon />}
          style={{ color: "#fff", backgroundColor: "#3b5998" }}
        >
          Login with Facebook
        </Button>

        <Button
          variant="contained"
          startIcon={<TwitterIcon />}
          style={{ color: "#fff", backgroundColor: "#1583d7" }}
        >
          Login with Facebook
        </Button>

        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          style={{ color: "#fff", backgroundColor: "#444" }}
        >
          Login with Facebook
        </Button>
      </div>

      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          width: 100vw;
        }

        .buttonGroup {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          margin: 8px;
        }

        .buttonGroup button {
          background-color: #4caf50; /* Green background */
          border: 1px solid green; /* Green border */
          color: white; /* White text */
          padding: 10px 24px; /* Some padding */
          cursor: pointer; /* Pointer/hand icon */
          width: 50%; /* Set a width if needed */
          display: block; /* Make the buttons appear below each other */
        }
      `}</style>
    </div>
  );
}

export default signin;

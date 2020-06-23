import React from "react";
import { auth } from "../utils/firebaseInit";
import Router from "next/router";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import IconButton from "@material-ui/core/IconButton";

import NoteAddIcon from "@material-ui/icons/NoteAdd";

function Mypage() {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/");
      }

      setLoggedIn(true);
    });
  });

  const [loggedIn, setLoggedIn] = React.useState(false);

  const signOut = async () => {
    await auth.signOut();
    localStorage.removeItem(publicRuntimeConfig.localStorageUserId);
    localStorage.removeItem(publicRuntimeConfig.localStorageDataId);
    Router.push("/");
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="container">
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
          <div className="logoutButton">
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div className="addButton">
        <IconButton
          aria-label="NoteAddIcon"
          color="secondary"
          onClick={() =>
            Router.push({
              pathname: "/new",
            })
          }
        >
          <NoteAddIcon style={{ fontSize: 50 }} />
        </IconButton>
      </div>

      <style jsx>
        {`
          .container {
            position: relative;
            height: 100vh;
            width: 100vw;
          }

          .logoutButton {
            position: absolute;
            right: 5px;
          }

          .addButton {
            position: fixed;
            right: 2px;
            bottom: 2px;
          }
        `}
      </style>
    </div>
  );
}

export default Mypage;

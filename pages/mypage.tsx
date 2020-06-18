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

// import withAuth from "../utils/withAuth";

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
    Router.push("/");
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
          <div className="loginButton">
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div>test</div>
      <style jsx>
        {`
          .loginButton {
            position: absolute;
            right: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default Mypage;

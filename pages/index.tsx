import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";

import { auth } from "../utils/firebaseInit";

export default function IndexPage() {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        Router.push("/mypage");
      }
    });
  });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
          <div className="loginButton">
            <Button
              color="inherit"
              onClick={() =>
                Router.push({
                  pathname: "/signin",
                })
              }
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
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

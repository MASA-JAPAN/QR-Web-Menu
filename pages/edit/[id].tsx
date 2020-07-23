//TODO: change file's name

import React from "react";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import { firestore, auth } from "../../utils/firebaseInit";

import Box from "@material-ui/core/Box";

import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

import Router from "next/router";

import FoodList from "../../components/FoodList";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const axios = require("axios").default;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: "100%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

function Edit(props: any) {
  const classes = useStyles();
  console.log(props.id);

  const [tileData, setTileData] = React.useState<object[]>([]);
  const [dataId, setDataId] = React.useState<string>("");
  const [dataRef, setDataRef] = React.useState<
    firebase.firestore.DocumentData
  >();

  React.useEffect(() => {
    const tmpDataId = localStorage.getItem(
      publicRuntimeConfig.localStorageDataId
    ) as string;

    setDataId(tmpDataId);

    console.log(tmpDataId);
    console.log(props.id);

    setDataRef(
      firestore
        .collection("users")
        .doc(tmpDataId)
        .collection("menus")
        .doc(props.id)
        .collection("foods")
    );

    const getTileDatas = async (): Promise<Object[]> => {
      let tmpTileData: Object[] = new Array();

      await firestore
        .collection("users")
        .doc(tmpDataId)
        .collection("menus")
        .doc(props.id)
        .collection("foods")
        .get()
        .then((docs: any) => {
          docs.forEach((doc: any) => {
            console.log(doc.data());
            tmpTileData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });

      return tmpTileData;
    };

    getTileDatas().then((tileDatas: any) => {
      setTileData(tileDatas);
    });

    console.log("tmpTileData:" + getTileDatas());
  }, []);

  return (
    <div className="container">
      <AppBar position="fixed">
        <Toolbar>
          <Typography onClick={() => Router.push("/mypage")}>
            QR WEB MENU
          </Typography>
          <Box position="absolute" right={0}>
            <IconButton
              color="secondary"
              aria-label="open"
              component="span"
              onClick={() => window.open(`/menu/${props.id}`, "_blank")}
            >
              <OpenInBrowserIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box mt={8}>
        {tileData && (
          <FoodList
            tileData={tileData}
            dataRef={dataRef}
            id={props.id}
            dataId={dataId}
            edit={true}
          />
        )}
      </Box>

      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </div>
  );
}

Edit.getInitialProps = async ({ query }: { query: any }) => {
  const id = query?.id;
  console.log(id);
  console.log(query);

  return { id: query?.id };
};

export default Edit;

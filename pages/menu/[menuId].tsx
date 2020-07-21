import React from "react";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Container from "@material-ui/core/Container";

import { firestore, auth } from "../../utils/firebaseInit";

import Box from "@material-ui/core/Box";

import DetailDialog from "../../components/DetailDialog";

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

function Menu(props: any) {
  const classes = useStyles();
  console.log(props.menuId);

  const [tileData, setTileData] = React.useState<object[]>([{ id: null }]);
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
    console.log(props.menuId);

    setDataRef(
      firestore
        .collection("users")
        .doc(tmpDataId)
        .collection("menus")
        .doc(props.menuId)
        .collection("foods")
    );

    const getTileDatas = async (): Promise<Object[]> => {
      let tmpTileData: Object[] = new Array();

      await firestore
        .collection("users")
        .doc(tmpDataId)
        .collection("menus")
        .doc(props.menuId)
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
          <Typography>MENU</Typography>
        </Toolbar>
      </AppBar>

      <Box mt={8}>
        <Container component="main" maxWidth="xs">
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {tileData.map((tile: any) => (
                <GridListTile key={tile.id}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    actionIcon={<DetailDialog tile={tile} dataRef={dataRef} />}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Container>
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

Menu.getInitialProps = async ({ query }: { query: any }) => {
  return { menuId: query?.menuId };
};

export default Menu;

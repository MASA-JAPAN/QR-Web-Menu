//TODO: change file's name

import React from "react";

//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Container from "@material-ui/core/Container";

import { firestore, auth } from "../../utils/firebaseInit";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";

import FormDialog from "../../components/FormDialog";
import EditDialog from "../../components/EditDialog";

import EditIcon from "@material-ui/icons/Edit";

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

  const [tileData, setTileData] = React.useState<object[]>([{}]);
  const [dataId, setDataId] = React.useState<string>("");
  const [dataRef, setDataRef] = React.useState<
    firebase.firestore.DocumentData
  >();

  React.useEffect(() => {
    const tmpDataId = localStorage.getItem(
      publicRuntimeConfig.localStorageDataId
    ) as string;

    setDataId(tmpDataId);

    // const queries = { userDataId: "JKgKxkYy5PmJn1b4PXwe", menuId: "testmenu" };
    // axios
    //   .get("/api/foods", { params: queries })
    //   .then((res: any) => {
    //     console.log(res.data[0].id);
    //   })
    //   .catch((error: any) => {
    //     console.log(error, queries);
    //   });

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
          <Typography>QR WEB MENU</Typography>
        </Toolbar>
      </AppBar>

      <Box mt={8}>
        <Container component="main" maxWidth="xs">
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {tileData.map((tile: any) => (
                <GridListTile key={tile.title}>
                  <Box position="absolute" right={2} top={2} zIndex={100}>
                    <EditDialog tile={tile} dataRef={dataRef} />
                  </Box>

                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar title={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Box position="fixed" right={2} bottom={2}>
            <FormDialog id={props.id} dataId={dataId} />
          </Box>
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

Edit.getInitialProps = async ({ query }: { query: any }) => {
  const id = query?.id;
  console.log(id);
  console.log(query);

  return { id: query?.id };
};

export default Edit;

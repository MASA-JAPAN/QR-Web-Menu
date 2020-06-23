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

import { firestore, auth } from "../utils/firebaseInit";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";

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
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

function Edit() {
  const classes = useStyles();

  const [tileData, setTileData] = React.useState<object[]>([{}]);

  return (
    <div className="container">
      <AppBar position="static">
        <Toolbar>
          <Typography>QR WEB MENU</Typography>
        </Toolbar>
      </AppBar>

      <Box mt={1}>
        <Container component="main" maxWidth="xs">
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div">December</ListSubheader>
              </GridListTile>
              {tileData.map((tile: any) => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>by: {tile.author}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${tile.title}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Box position="fixed" right={2} bottom={2}>
            <IconButton aria-label="AddCircleIcon" color="secondary">
              <AddCircleIcon style={{ fontSize: 50 }} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <style jsx>{``}</style>
    </div>
  );
}

Edit.getInitialProps = async ({ query }: { query: any }) => {
  const id = query?.id;
  console.log(id);
  console.log(query);

  return { values: "test" };
};

export default Edit;

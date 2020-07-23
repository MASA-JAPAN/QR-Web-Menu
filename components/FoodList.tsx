import React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Container from "@material-ui/core/Container";

import Box from "@material-ui/core/Box";

import FormDialog from "./FormDialog";
import EditDialog from "./EditDialog";
import DetailDialog from "./DetailDialog";

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

function FoodList(props: any) {
  const classes = useStyles();
  console.log(props.id);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {props.tileData.map((tile: any) => (
              <GridListTile key={tile.id}>
                <Box position="absolute" right={2} top={2} zIndex={100}>
                  <EditDialog tile={tile} dataRef={props.dataRef} />
                </Box>

                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  actionIcon={
                    <DetailDialog tile={tile} dataRef={props.dataRef} />
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Box position="fixed" right={2} bottom={2}>
          <FormDialog id={props.id} dataId={props.dataId} />
        </Box>
      </Container>
    </div>
  );
}

export default FoodList;

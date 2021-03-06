import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";

import { uploadFood } from "../utils/firebaseUtility";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function FormDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [imgFile, setImgFile] = React.useState<Blob>();
  const [nameValue, setNameValue] = React.useState<string>(props.tile.title);
  const [descriptionValue, setDescriptionValue] = React.useState<string>(
    props.tile.description
  );
  const imgEL = React.useRef<HTMLImageElement>(null);
  const labelEL = React.useRef<HTMLLabelElement>(null);
  const [dataRef, setDataRef] = React.useState<
    firebase.firestore.DocumentData
  >();

  console.log(props.tile.id);

  React.useEffect(() => {
    setDataRef(props.dataRef);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImg = (e: any) => {
    console.log("aa");

    labelEL.current?.style.setProperty("display", "none");

    const reader = new FileReader();
    reader.onload = (e: any) => {
      imgEL.current?.setAttribute("src", e.target?.result as string);
    };

    reader.readAsDataURL(e.target.files[0]);

    setImgFile(e.target?.files[0]);
  };

  const handleChangeNameValue = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleDescriptionValue = (e: any) => {
    setDescriptionValue(e.target.value);
  };

  const handleClickSave = async () => {
    const dataId = props.tile.dataId;
    const menuId = props.tile.id;

    if (dataRef) {
      dataRef.doc(props.tile.id).update({
        title: nameValue,
        description: descriptionValue,
      });
    }

    handleClose();
  };

  const handleClickDelete = async () => {
    if (dataRef) {
      dataRef.doc(props.tile.id).delete();
    }

    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="AddCircleIcon"
        color="secondary"
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Food</DialogTitle>
        <Box position="absolute" right={0} top={0}>
          <IconButton aria-label="DeleteCircleIcon" onClick={handleClickDelete}>
            <DeleteIcon style={{ color: "red" }} fontSize="large" />
          </IconButton>
        </Box>

        <DialogContent>
          <Box
            display="flex"
            height={200}
            alignItems="center"
            justifyContent="center"
            mb={1}
            boxShadow="0px 0px 7px rgba(0,0,0,0.4)"
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleChangeImg}
            />

            <img
              className="preview"
              ref={imgEL}
              style={{ maxHeight: 200 }}
              src={props.tile.img}
            />
          </Box>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChangeNameValue}
            defaultValue={props.tile.title}
          />
          <TextField
            margin="normal"
            id="Description"
            label="Description"
            name="Description"
            fullWidth
            multiline
            rows={4}
            onChange={handleDescriptionValue}
            defaultValue={props.tile.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

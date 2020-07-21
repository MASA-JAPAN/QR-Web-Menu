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

import InfoIcon from "@material-ui/icons/Info";

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

  return (
    <div>
      <IconButton
        aria-label="InfoCircleIcon"
        onClick={handleClickOpen}
        style={{ color: "rgba(255, 255, 255, 0.54)" }}
      >
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Food</DialogTitle>

        <DialogContent>
          <Box
            display="flex"
            height={200}
            alignItems="center"
            justifyContent="center"
            mb={1}
            boxShadow="0px 0px 7px rgba(0,0,0,0.4)"
          >
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
            InputProps={{
              readOnly: true,
            }}
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
            InputProps={{
              readOnly: true,
            }}
            defaultValue={props.tile.description}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

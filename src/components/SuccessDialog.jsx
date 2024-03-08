import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SuccessDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Se agregó el anime con éxito"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          El anime se agregó con éxito, puedes cerrar esta ventana.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus color="success">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

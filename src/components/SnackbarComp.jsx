import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackbarComp = ({ isOpen, setOpen, from }) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={() => setOpen(false)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="error"
        sx={{ width: 400 }}
      >
        {from === "dashboard"
          ? "Please select a Workflow first."
          : "No Flow Found"}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComp;

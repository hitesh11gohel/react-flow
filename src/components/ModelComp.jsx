import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: 160,
  borderRadius: "12px",
  p: 4,
};

const ConfirmationModel = ({
  openDelete,
  setDelete,
  handleDelete,
  item = {},
  type,
}) => {
  const handleOperation = () => {
    type === "edgeModel" ? handleDelete() : handleDelete(item);
  };

  return (
    <Modal open={openDelete} onClose={() => setDelete(false)}>
      <Box sx={style}>
        <Grid className="d-flex justify-content-center">
          <Typography sx={{ fontWeight: 400, fontSize: "18px" }}>
            {`Are you sure want to delete this ${
              type === "edgeModel" ? "Edge?" : "Node?"
            }`}
          </Typography>
        </Grid>
        <Grid
          className="d-flex justify-content-center"
          sx={{ p: "30px", gap: "10px" }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setDelete(false)}
          >
            Cancel
          </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={() => handleOperation()}
          >
            Delete
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModel;

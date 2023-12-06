import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ value }) => {
  return (
    <Backdrop
      open={value}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;

import React from "react";
import { Box, Button } from "@mui/material";

const FrameActions = ({ data, nextEvent, handlePreviousClick, frameOrder }) => (
  <Box className="d-flex justify-content-center mt-5">
    {frameOrder.length > 0 && (
      <Button
        className="mx-2"
        size="small"
        variant="outlined"
        onClick={() => handlePreviousClick(frameOrder.pop())}
      >
        Previous
      </Button>
    )}
    <Button
      className="mx-2"
      size="small"
      variant="contained"
      // color={data.data.isAttached ? "primary" : "inherit"}
      onClick={() => nextEvent(data)}
    >
      Lets Go
    </Button>
  </Box>
);

export default FrameActions;

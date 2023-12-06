import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton } from "@mui/material";

/* Save and Cancel Action Buttons */
const Actions = ({
  isVal,
  action,
  fromChild,
  handleSave,
  parentFrame,
  isRequire,
}) => {
  if (isRequire === true || isRequire === false)
    if (!isRequire && !!isVal) {
      if (isVal.toString().includes("valid")) isVal = false;
      else isVal = true;
    } else if (isVal === "") isVal = false;
    else isVal = true;
  return (
    <Box>
      <IconButton
        disabled={isVal}
        sx={{ m: 1, border: 1, color: "#1733ff" }}
        onClick={() => handleSave(parentFrame, action)}
      >
        <SaveIcon />
      </IconButton>
      <IconButton sx={{ m: 1, border: 1 }} onClick={() => fromChild()}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default Actions;

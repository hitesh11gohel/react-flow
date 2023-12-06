import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = () => {
    navigate("/", { state: { from: location } });
    const currentFlow = localStorage.getItem("CurrentFlowName");
    currentFlow && localStorage.setItem("NewFlowName", currentFlow);
    localStorage.removeItem("CurrentFlowName");
  };
  return (
    <Box className={"shadow-sm d-flex"} bgcolor={"#111827"} height={"70px"}>
      <Tooltip title="Back">
        <IconButton className="mx-3" color="inherit" onClick={handleChange}>
          <KeyboardBackspaceIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BackButton;

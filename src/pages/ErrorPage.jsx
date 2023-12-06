import React from "react";
import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box className={"centerDiv"}>
      <Typography variant="h1">404</Typography>
      <Typography mb={3} variant="h4">
        Oops, Page not found
      </Typography>
      <Button color="inherit" onClick={() => navigate("/")}>
        <KeyboardBackspaceIcon />
      </Button>
    </Box>
  );
};

export default ErrorPage;

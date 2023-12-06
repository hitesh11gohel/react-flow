import { Avatar, Stack } from "@mui/material";
import React from "react";

const FrameHeading = ({ heading }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Avatar
      src={heading?.data?.icon}
      alt="icon"
      sx={{ width: 30, height: 30, mx: 1, bgcolor: "#4e4cff" }}
    />
    {/* <Typography variant="h6">{heading?.data?.label}</Typography> */}
  </Stack>
);

export default FrameHeading;

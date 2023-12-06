import { Avatar, Box, Stack } from "@mui/material";
import React, { memo } from "react";

export default memo(({ data }) => (
  <Stack>
    <Box className="d-flex justify-content-center mt-5">
      <Avatar
        p-5
        src={data?.value}
        sx={{ width: 125, height: 125, padding: 1, borderRadius: 0 }}
      ></Avatar>
    </Box>
  </Stack>
));

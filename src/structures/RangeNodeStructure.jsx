import { Box, Stack, Typography, Slider } from "@mui/material";
import React, { memo, useCallback } from "react";

export default memo(({ data, isConnectable }) => {
  const onChange = useCallback((e) => (data.value = e.target.value), [data]);
  return (
    <Stack>
      {data?.label && (
        <Typography variant="caption" textAlign={"center"}>
          {data?.label?.toUpperCase()}
        </Typography>
      )}
      <Box
        p={2.5}
        width={500}
        marginY={"1rem"}
        bgcolor={"white"}
        border="1px solid lightgray"
      >
        <Slider
          marks
          min={data.min}
          max={data.max}
          step={data.step}
          className="nopan"
          onChange={onChange}
          valueLabelDisplay="auto"
          sx={{ color: "inherit" }}
          defaultValue={data.value}
          getAriaValueText={(value) => value}
        />
      </Box>
    </Stack>
  );
});

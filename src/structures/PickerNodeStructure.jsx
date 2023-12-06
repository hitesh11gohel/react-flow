import { makeStyles } from "@material-ui/core";
import { Box, Stack, Select, Typography, MenuItem } from "@mui/material";
import React, { memo, useCallback } from "react";

const useStyles = makeStyles({
  customPaper: {
    minWidth: "160px !important",
    justifyContent: "center !important",
  },
  customInput: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(({ data, isConnectable }) => {
  const classes = useStyles();
  const onChange = useCallback(
    (e) => {
      data.value = e.target.value;
      data.selectedLabel = data.options.find(
        (f) => f.value === e.target.value
      ).label;
    },
    [data]
  );
  return (
    <Stack>
      {data?.label && (
        <Typography
          variant="caption"
          textAlign={"center"}
          className="text-truncate"
        >
          {data?.label?.toUpperCase()}
        </Typography>
      )}
      <Box marginY={"1rem"}>
        <Select
          name="text"
          size="small"
          variant="filled"
          bgcolor={"white"}
          className="nodrag"
          onChange={onChange}
          defaultValue={data.value}
          placeholder={data?.placeholder}
          inputProps={{ className: classes.customInput }}
          MenuProps={{ classes: { paper: classes.customPaper } }}
          sx={{
            width: 525,
            bgcolor: "white",
            overflowY: "auto",
            borderTop: "1px solid #c1bfbf",
            borderLeft: "1px solid #d1d1d1",
          }}
        >
          {data.options.map(({ label, value }, i) => (
            <MenuItem
              key={i}
              value={value}
              className="d-flex justify-content-center text-center"
              sx={{ width: 525 }}
            >
              <Typography
                className="text-truncate text-center"
                sx={{ width: "auto" }}
              >
                {label}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
});

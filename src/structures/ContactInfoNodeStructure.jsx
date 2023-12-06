import { makeStyles } from "@material-ui/core";
import { Stack, TextField, Typography } from "@mui/material";
import React, { Fragment, memo, useCallback } from "react";
import { Handle, Position } from "reactflow";

const useStyles = makeStyles(() => ({
  root: { "& .MuiFilledInput-root": { background: "white" } },
}));

const ContactInfoGroupType = ({ data, onChange }) => {
  const classes = useStyles();

  return (
    <Stack px={1.5} borderRight={"1px solid #aaa"}>
      {data?.items.map((item, i) => (
        <TextField
          key={i}
          size="small"
          variant="filled"
          name={item.name}
          onChange={onChange}
          className={classes.root}
          defaultValue={item?.label}
          placeholder={item?.placeholder}
          sx={{ width: "500px", my: "5px" }}
        />
      ))}
    </Stack>
  );
};

export default memo(({ data, isConnectable }) => {
  const onChange = useCallback(
    (e) => {
      return (data.items.find((f) => f.name === e.target.name).label =
        e.target.value);
    },
    [data]
  );

  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ display: data.isConnectable ? "block" : "none" }}
      />
      <Stack>
        {data?.label && (
          <Typography variant="caption" textAlign={"center"}>
            {data?.label?.toUpperCase()}
          </Typography>
        )}
        <Stack marginY={"1rem"}>
          <ContactInfoGroupType data={data} onChange={onChange} />
        </Stack>
      </Stack>
    </Fragment>
  );
});

import { makeStyles } from "@material-ui/core";
import { Stack, TextField, Typography, Grid } from "@mui/material";
import React, { Fragment, memo, useCallback } from "react";
import { Handle, Position } from "reactflow";

const useStyles = makeStyles(() => ({
  root: { "& .MuiFilledInput-root": { background: "white" } },
}));

const GroupType = ({ data, onChange }) => {
  const classes = useStyles();
  return (
    <Stack px={1.5} borderRight={"1px solid #aaa"}>
      {data?.items.map((item, key) =>
        item.type === "text" ? (
          <TextField
            key={key}
            size="small"
            variant="filled"
            name={item.name}
            onChange={onChange}
            className={classes.root}
            defaultValue={item?.label}
            placeholder={item.placeholder}
            sx={{ width: "500px", my: "5px" }}
          />
        ) : item.type === "row" ? (
          item.items.map((item, i) => (
            <Grid key={i}>
              <TextField
                size="small"
                variant="filled"
                name={item.name}
                onChange={onChange}
                className={classes.root}
                defaultValue={item?.label}
                placeholder={item.placeholder}
                sx={{ width: "500px", my: "5px" }}
              />
            </Grid>
          ))
        ) : null
      )}
    </Stack>
  );
};

export default memo(({ data, isConnectable }) => {
  const onChange = useCallback(
    (e) => {
      let arr = data.items.find((f) => f.name === e.target.name);
      if (!arr) {
        let rowTypeData = data.items.filter((f) => f.type === "row");
        arr = rowTypeData[0].items.find((f) => f.name === e.target.name);
      }
      arr.label = e.target.value;
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
          <GroupType data={data} onChange={onChange} />
        </Stack>
      </Stack>
    </Fragment>
  );
});

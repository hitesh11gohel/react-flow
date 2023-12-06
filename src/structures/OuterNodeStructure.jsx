import { Avatar, Stack, Typography } from "@mui/material";
import React, { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";

export default memo(({ data, isConnectable, selected }) => (
  <Fragment>
    {data.isFrame && (
      <NodeResizer isVisible={selected} minWidth={100} minHeight={200} />
    )}
    <Handle
      type="target"
      position={Position.Left}
      isConnectable={isConnectable}
      style={{ display: data.isConnectable ? "block" : "none" }}
    />
    <Stack
      direction="row"
      alignItems={"top"}
      justifyContent={"center"}
      sx={{ height: "90px", overflowY: "auto", m: 1 }}
    >
      {data.icon && (
        <Avatar
          src={data?.icon}
          alt={data?.label}
          sx={{ width: 30, height: 30, mx: 1.5, p: 0.5 }}
        />
      )}
      {data?.label && (
        <Typography variant="caption" marginY={"1rem"}>
          {data?.label?.toUpperCase()}
        </Typography>
      )}
    </Stack>
  </Fragment>
));

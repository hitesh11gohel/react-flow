import { Avatar, Stack, Typography } from "@mui/material";
import React, { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";

export default memo(({ data, isConnectable, selected }) => (
  <Fragment>
    <NodeResizer isVisible={selected} />
    <Handle
      type="target"
      position={Position.Left}
      isConnectable={isConnectable}
      style={{ display: data.isConnectable ? "block" : "none" }}
    />
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent={data.isFrame ? "left" : "center"}
    >
      {data.isFrame && (
        <Avatar
          src={data?.icon}
          alt={data?.label}
          sx={{ width: 30, height: 30, mx: 1.5, p: 0.5 }}
        />
      )}
      <Typography className="text-truncate fs-5 p-3" sx={{ fontWeight: 600 }}>
        {data?.label?.toUpperCase()}
      </Typography>
    </Stack>
    <Handle
      type="source"
      position={Position.Right}
      isConnectable={isConnectable}
    />
  </Fragment>
));

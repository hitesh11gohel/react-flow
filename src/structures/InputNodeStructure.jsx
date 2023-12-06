import { Stack, Typography } from "@mui/material";
import React, { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Stack
        direction="row"
        className=" justify-content-center align-item-center"
      >
        {data?.label && (
          <Typography
            className="text-truncate fs-5 p-3"
            sx={{ fontWeight: 600 }}
          >
            {data?.label?.toUpperCase()}
          </Typography>
        )}
      </Stack>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </Fragment>
  );
});

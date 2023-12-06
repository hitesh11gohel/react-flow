import { Box } from "@mui/material";
import React, { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ display: `${data?.name ? "block" : "none"}` }}
      />
      <Box
        className="d-flex align-items-center justify-content-center"
        style={{ width: data?.name === "" ? "auto" : "165px" }}
      >
        <img
          style={{ marginLeft: "8px" }}
          src={data?.imageURL}
          alt="..."
          width={"30px"}
          height={"30px"}
        />
        <small style={{ marginLeft: "8px" }}>{data?.name?.toUpperCase()}</small>
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </Fragment>
  );
});

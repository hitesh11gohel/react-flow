import React, { Fragment } from "react";
import { getSmoothStepPath } from "reactflow";
import { IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const foreignObjectSize = 100;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <Fragment>
      <path
        id={id}
        style={style}
        d={edgePath}
        className="react-flow__edge-path"
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 5}
        y={labelY - foreignObjectSize / 5}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        className="edgebutton-foreignobject"
      >
        <Grid
          sx={{
            background: "lightgrey",
            width: "40px",
            borderRadius: "20px",
            opacity: 0.6,
          }}
        >
          <IconButton className="edgebutton">
            <CloseIcon />
          </IconButton>
        </Grid>
      </foreignObject>
    </Fragment>
  );
}

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Paper,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import FrameActions from "./FrameActions";

const TextFieldComp = ({ item }) => (
  <Box width={415}>
    <TextField
      fullWidth
      className="mt-3"
      variant="standard"
      defaultValue={item.label || ""}
      disabled
    />
  </Box>
);

const FrameContent = ({
  frameOrder,
  handlePreviousClick,
  data,
  nextEvent,
  nodes,
}) => {
  let isButton = true;
  if (data?.data?.type === "newGroup") {
    isButton = false;
    data = nodes.filter((f) => f.parentNode === data.id);
  } else data = [data];
  if (data)
    return (
      <Box className="p-1 mt-2 d-flex flex-wrap rounded">
        {data?.map((data) => (
          <Stack key={data.id}>
            <Paper
              elevation={1}
              id="buttons-stack"
              sx={{ minWidth: 100, width: 459 }}
              className="m-2 p-3 border overflow-auto"
            >
              {data?.specialType !== "info" ? (
                <Box className="d-flex justify-content-center">
                  <Tooltip title={data.data.label}>
                    <Typography
                      className="text-truncate"
                      sx={{ fontWeight: 600 }}
                    >
                      {data.data.label.toUpperCase()}
                    </Typography>
                  </Tooltip>
                </Box>
              ) : (
                <Fragment>
                  <Box className="d-flex align-items-center justify-content-between">
                    <Tooltip title={data.data.label}>
                      <Typography
                        maxWidth={377}
                        variant="body2"
                        className="text-truncate"
                      >
                        {data.data.label}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Fragment>
              )}
              {(data.type === "input" || data.type === "Frame") && (
                <Fragment>
                  <Box className="d-flex ">
                    <Box>
                      {data.options?.map((option, i) => (
                        // (option.target || option.isAttached) &&
                        <Tooltip key={i} title={option.label}>
                          <Button
                            size="small"
                            variant="outlined"
                            className="mx-2 mt-3"
                            sx={{ minWidth: 150 }}
                            color={option.isAttached ? "primary" : "inherit"}
                            onClick={() => nextEvent(option.nextFrame)}
                            // onClick={() => nextEvent(option.nextFrame ?? data)}
                          >
                            {option.label.length > 15
                              ? option.label.substring(0, 15) + "..."
                              : option.label}
                          </Button>
                        </Tooltip>
                      ))}
                    </Box>
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.data.type === "auth" && (
                <Fragment>
                  <Box className="d-flex justify-content-between">
                    <Box className="d-flex align-items-center">
                      <Checkbox
                        defaultChecked={
                          nodes.find((f) => f.parentNode === data.id).data.value
                        }
                        color={"default"}
                        disabled
                      />
                      <Typography
                        className="text-truncate"
                        sx={{ width: "330px" }}
                      >
                        {nodes.find((f) => f.parentNode === data.id).data.label}
                      </Typography>
                    </Box>
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {(data.data.type === "photoFields" ||
                data.data.type === "upload") && (
                <Fragment>
                  <Box className="d-flex justify-content-center align-item-center pt-2">
                    <Avatar
                      variant="square"
                      sx={{ height: "100px", width: "100px" }}
                      className="d-flex justify-content-center mt-2"
                      src={
                        nodes.find((f) => f.parentNode === data.id).data.value
                      }
                    />
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.type === "textFields" && (
                <Fragment>
                  <Box className="d-flex align-items-center">
                    <TextField
                      disabled
                      fullWidth
                      className="mt-3"
                      variant="standard"
                      defaultValue={data.data.value}
                    />
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.data.type === "range" && (
                <Fragment>
                  <Box className="d-flex justify-content-between align-items-center pt-5">
                    <Slider
                      marks
                      disabled
                      sx={{ width: 360, marginInline: "auto" }}
                      valueLabelDisplay="on"
                      defaultValue={
                        nodes.find((f) => data.id === f.parentNode).data.value
                      }
                      max={data.max | data.data.max}
                      step={data.step | data.data.step}
                    />
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}

              {data.data.type === "picker" && (
                <Fragment>
                  <Button
                    variant="outlined"
                    color={data.data.isAttached ? "primary" : "inherit"}
                    size="small"
                    className="mx-2 mt-3"
                    sx={{
                      textOverflow: "ellipsis",
                      maxHeight: "31px",
                      overflow: "hidden",
                      width: 150,
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                    // onClick={() => nextEvent(data)}
                  >
                    {data.data.value === undefined
                      ? nodes
                          .find((f) => f.parentNode === data.id)
                          .data.options.find(
                            (d) =>
                              d.value ===
                              nodes.find((f) => f.parentNode === data.id).data
                                .value
                          ).label
                      : nodes
                          .find((f) => f.parentNode === data.id)
                          .data.options.find(
                            (obj) =>
                              obj.value ===
                              nodes.find((f) => f.parentNode === data.id).data
                                .value
                          ).label}
                  </Button>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.data.type === "group" && (
                <Fragment>
                  <Box className="d-flex">
                    <Box>
                      {nodes
                        .find((f) => f.parentNode === data.id)
                        .data.items.map((item) =>
                          item.type === "text" ? (
                            <TextFieldComp item={item} />
                          ) : item.type === "row" ? (
                            item.items.map((rows) => (
                              <TextFieldComp item={rows} />
                            ))
                          ) : null
                        )}
                    </Box>
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.data.type === "contactInfoFields" && (
                <Fragment>
                  <Box className="d-flex">
                    <Box>
                      {nodes
                        .find((f) => f.parentNode === data.id)
                        .data.items.map((item, i) =>
                          item.type === "text" ? (
                            <TextFieldComp key={i} item={item} />
                          ) : null
                        )}
                    </Box>
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
              {data.data.type === "addressgroup" && (
                <Fragment>
                  <Box className="d-flex">
                    <Box>
                      {nodes
                        .find((f) => f.parentNode === data.id)
                        .data.items.map((item) => {
                          const tempLabel = item.options?.find(
                            (f) => f.value === item.value
                          ).label;
                          return item.type === "text" ? (
                            <TextFieldComp item={item} />
                          ) : item.type === "picker" ? (
                            <Box>
                              <Button
                                variant="outlined"
                                color={
                                  data.data.isAttached ? "primary" : "inherit"
                                }
                                size="small"
                                className="mt-3"
                                minWidth={200}
                              >
                                {tempLabel.length > 15
                                  ? tempLabel.substring(0, 15) + "..."
                                  : tempLabel}
                              </Button>
                            </Box>
                          ) : null;
                        })}
                    </Box>
                  </Box>
                  {isButton && (
                    <FrameActions
                      data={data}
                      nextEvent={nextEvent}
                      handlePreviousClick={handlePreviousClick}
                      frameOrder={frameOrder}
                    />
                  )}
                </Fragment>
              )}
            </Paper>
          </Stack>
        ))}
      </Box>
    );
};

export default FrameContent;

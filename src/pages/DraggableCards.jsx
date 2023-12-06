import { Stack, Card, Typography, Divider, IconButton } from "@mui/material";
import { FrameNode } from "./InitialNodes";
import { Fragment, useContext } from "react";
import { DashboardContext } from "../WorkFlowContext";

export default function DraggableCards() {
  const { setSaveOpen, triggerEvent } = useContext(DashboardContext);
  const onDragEnd = (event, items) => {
    let foundItem = FrameNode.find(
      (ele) => ele.draggableId === items.draggableId
    );
    const { icon, title, type } = foundItem;
    localStorage.setItem("fromCards", JSON.stringify({ icon, title, type }));
  };
  const onDragStart = (event, nodeType) => {
    if (
      !localStorage.getItem("flowJSON") &&
      !localStorage.getItem("NewFlowName")
    ) {
      setSaveOpen(true);
      localStorage.removeItem("CurrentFlowName");
      localStorage.setItem("NewFlowName", "New Flow");
      triggerEvent("add");
    }
    event.dataTransfer.setData("application/reactflow", nodeType.type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Fragment>
      {FrameNode.map((item, index) => (
        <Stack
          key={index}
          padding="10px"
          sx={{ backgroundColor: "rgb(17, 24, 39)" }}
        >
          <Card
            onDragStart={(event) => onDragStart(event, item)}
            onDragEnd={(event) => onDragEnd(event, item)}
            draggable
            sx={{
              backgroundColor: "rgb(17, 24, 39)",
              border: " 1px solid rgb(195,195,195)",
              "&:hover": { borderColor: "white", cursor: "pointer" },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              p={0.5}
              sx={{ cursor: "pointer", textDecorationColor: "white" }}
            >
              <IconButton sx={{ color: "#29fcff" }}>{item.icon}</IconButton>
              <Typography
                sx={{ color: "#f8f9fa", "&:hover": { color: "white" } }}
              >
                {item.label.toString().toUpperCase()}
              </Typography>
            </Stack>
          </Card>
          <Divider></Divider>
        </Stack>
      ))}
    </Fragment>
  );
}

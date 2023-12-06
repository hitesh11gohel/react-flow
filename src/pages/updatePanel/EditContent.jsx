import { Box, Button, Divider, Typography } from "@mui/material";
import NodeTypes from "./NodeTypes";
import Question from "./Question";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import { Fragment } from "react";

const EditContent = (props) => {
  const {
    nodes,
    flow,
    item,
    nodeGap,
    setNodeGap,
    refresh,
    setRefresh,
    blockBtns,
    setBlockBtns,
    classes,
    isDisabled,
    fromChild,
  } = props;

  const handleAddBtnClick = (data) => {
    const margin = data[0].position.y;
    const childNode = nodes.find((f) => f.id === data[0].parentNode);
    let frameAllChildNode = nodes.filter(
      (f) => f.parentNode === childNode.parentNode
    );

    frameAllChildNode.forEach((a) => {
      if (a.position.y > childNode.position.y) {
        const index = nodes.findIndex((f) => f.id === a.id);
        nodes[index].position.y += margin;
      }
    });

    flow.nodes = nodes;
    localStorage.setItem("flow", JSON.stringify(flow));

    setNodeGap({ value: nodeGap.value + 1, margin: margin });
    if (
      data[0].data.type === "group" ||
      data[0].data.type === "contact-info-group"
    ) {
      const newVal = "GroupText" + uuidv4();
      data[0].data.items.push({
        question: "What is your question?",
        type: "text",
        placeholder: "Add new text",
        fieldId: newVal,
        name: newVal,
        label: "",
        value: "",
      });
      setRefresh(!refresh);
    } else {
      const position = data[data.length - 1].position;
      const newVal = `New-${data.length + 1}`;
      const tempObj = {
        draggableId: `node-${uuidv4()}`,
        id: `node-${uuidv4()}`,
        type: "input",
        sourcePosition: "right",
        position: { x: position.x, y: position.y + margin },
        parentNode: data[0].parentNode,
        data: { label: newVal, value: newVal, target: "" },
        style: {
          overflow: "hidden",
          display: "inline-block",
          textDecoration: " none",
          textOverflow: "ellipsis",
          borderRadius: "5px",
          whiteSpace: "nowrap",
          border: "1px solid rgb(137, 131, 131)",
        },
        extent: "parent",
      };
      setBlockBtns([...blockBtns, tempObj]);
    }
  };

  return (
    <Box className="rounded m-2">
      <Box className="py-3">
        <Typography variant="subtitle2" className="fw-bold mb-1">
          Enter Text for your questions.
        </Typography>
        <Question
          nodes={nodes}
          data={item.data}
          parentFrame={item}
          fromChild={fromChild}
        />

        {blockBtns?.length > 0 && (
          <Fragment>
            <Divider className={`m-2 ${classes.dividrCss}`} />
            {!isDisabled && (
              <Box className="d-flex justify-content-between align-items-center mx-2">
                <Typography variant="subtitle2" className="fw-bold">
                  Button Options
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ fontWeight: "bold", color: "#1d00ff" }}
                  onClick={() => handleAddBtnClick(blockBtns)}
                >
                  Add
                </Button>
              </Box>
            )}
            <NodeTypes
              nodes={nodes}
              count={nodeGap}
              action={blockBtns}
              parentFrame={item}
              fromChild={fromChild}
            />
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default EditContent;

import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MobileStepper,
  Typography,
} from "@mui/material";
import SnackbarComp from "../../components/SnackbarComp";
import BackButton from "../../components/BackButton";
import FrameHeading from "./FrameHeading";
import FrameContent from "./FrameContent";
import FrameActions from "./FrameActions";

const PreviewPage = () => {
  const [open, setOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [frameOrder, setFrameOrder] = useState([]);
  const [activeStep, setActivestep] = useState(1);
  const [step, setStep] = useState();
  const [currentNode, setCurrentNode] = useState();
  const [allMainNode, setAllMainNode] = useState();
  const flow = JSON.parse(localStorage.getItem("previewData"));
  const nodes = flow.nodes;
  const edges = flow.edges;

  useEffect(() => {
    const allParentNode = nodes.filter((f) => f.parentNode === undefined);
    if (allParentNode) {
      setCurrentNode(allParentNode[0]);
      modifiedAllParentNodes(allParentNode);
      // getInitialStep(allParentNode);
      setStep(edges.length + 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialStep = (allParentNode) => {
    let count = 0;
    const tempEdge = edges[0]?.target;
  };

  const modifiedAllParentNodes = (data) => {
    data.forEach((item) => {
      const edge = edges.find((f) => f.source === item.id);
      if (edge) {
        item.isAttached = true;
        item.nextFrame = edge.target;
      }
      if (item.options && item.type === "Frame") {
        const childNode = nodes.filter((f) => f.parentNode === item.id);
        childNode.forEach((obj, key) => {
          const childNodeEdge = edges.find((f) => f.source === obj.id);
          if (childNodeEdge) {
            item.options[key].isAttached = true;
            item.options[key].nextFrame = childNodeEdge.target;
          }
        });
      }
    });
    setAllMainNode(data);
  };

  const nextEvent = (node) => {
    const formattedId = typeof node === "string" ? node : node.nextFrame;
    const nextNode = allMainNode.find((f) => f.id === formattedId);
    if (nextNode) {
      setCurrentNode(nextNode);
      setActivestep(activeStep + 1);
    }
    if (node.nextFrame || typeof node === "string")
      setFrameOrder([...frameOrder, currentNode]);
    else setOpen(true);
  };

  const handlePreviousClick = (preFrame) => {
    setActivestep(activeStep - 1);
    setTimeout(() => {
      setIsLoad(false);
      setCurrentNode(preFrame);
    }, 250);
  };

  return (
    <Fragment>
      <BackButton />

      <Box sx={{ bgcolor: "aliceblue" }} height="inherit">
        {!isLoad && currentNode !== undefined && (
          <Box
            bgcolor="aliceblue"
            className="d-flex justify-content-center  pt-5"
          >
            <MobileStepper
              bgcolor="aliceblue"
              variant="progress"
              steps={step}
              position="static"
              activeStep={activeStep}
              className="d-flex justify-content-center"
              sx={{
                maxWidth: 1100,
                flexGrow: 1,
                bgcolor: "aliceblue !important",
              }}
            />
          </Box>
        )}
        <Box
          p={frameOrder.length > 0 ? 3 : 5}
          className="d-flex justify-content-center align-items-center"
        >
          {!isLoad &&
            (currentNode !== undefined ? (
              <Card
                className="p-3 border rounded"
                id="buttons-stack"
                sx={{
                  width: 525,
                  height: "auto",
                  backgroundImage:
                    "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
                }}
              >
                <FrameHeading heading={currentNode} />
                <FrameContent
                  frameOrder={frameOrder}
                  handlePreviousClick={handlePreviousClick}
                  data={currentNode}
                  nextEvent={nextEvent}
                  nodes={nodes}
                />
                {currentNode?.data?.type === "newGroup" && (
                  <FrameActions
                    data={currentNode}
                    nextEvent={nextEvent}
                    handlePreviousClick={handlePreviousClick}
                    frameOrder={frameOrder}
                  />
                )}
              </Card>
            ) : (
              <Box className={"centerDiv"}>
                <Typography variant="h4">NO DATA FOUND</Typography>
              </Box>
            ))}

          {isLoad && (
            <Box className="d-flex justify-content-center align-items-center">
              <Box className={"centerDiv"}>
                <CircularProgress />
              </Box>
            </Box>
          )}
          <SnackbarComp isOpen={open} setOpen={setOpen} from="preview" />
        </Box>
      </Box>
    </Fragment>
  );
};

export default PreviewPage;

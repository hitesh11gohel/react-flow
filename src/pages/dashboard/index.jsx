/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Stack } from "@mui/material";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Workflow_1, Workflow_2, Workflow_3 } from "../InitialNodes";
import DraggableCards from "../DraggableCards";
import NodeStructure from "../../structures/NodeStructure";
import OuterNodeStructure from "../../structures/OuterNodeStructure";
import TextFieldNodeStructure from "../../structures/TextFieldNodeStructure";
import PickerNodeStructure from "../../structures/PickerNodeStructure";
import UpdatePanel from "../updatePanel";
import RangeNodeStructure from "../../structures/RangeNodeStructure";
import GroupNodeStructure from "../../structures/GroupNodeStructure";
import ContactInfoNodeStructure from "../../structures/ContactInfoNodeStructure";
import AddressGroupNodeStructure from "../../structures/AddressGroupNodeStructure";
import AuthNodeStructure from "../../structures/AuthNodeStructure";
import UploadNodeStructure from "../../structures/UploadNodeStructure";
import FrameStructure from "../../structures/FrameStructure";
import PhotoNodeStructure from "../../structures/PhotoNodeStructure";
import InputNodeStructure from "../../structures/InputNodeStructure";
import ButtonEdge from "../../structures/ButtonEdge";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import ConfirmationModel from "../../components/ModelComp";
import SaveModal from "../../components/SaveModal";
import {
  ssnNode,
  newGroup,
  addFrame,
  dobNodes,
  authNodes,
  boolNodes,
  textNodes,
  photoNode,
  newSubNode,
  emailNodes,
  phoneNodes,
  rangeNodes,
  groupNodes,
  pickerNodes,
  choiceNodes,
  uploadNodes,
  contactInfo,
  pickerState,
  addressNodes,
  currencyNode,
  declarationNode,
  informationNode,
  addressGroupNodes,
  pickerStateLicenced,
} from "../FrameChilds";
import SnackbarComp from "../../components/SnackbarComp";
import Loader from "../../components/Loader";
import { DashboardContext } from "../../WorkFlowContext";

const nodeTypes = {
  Frame: FrameStructure,
  upload: UploadNodeStructure,
  selectorNode: NodeStructure,
  authFields: AuthNodeStructure,
  outerNode: OuterNodeStructure,
  rangeFields: RangeNodeStructure,
  groupFields: GroupNodeStructure,
  photoFields: PhotoNodeStructure,
  customeInput: InputNodeStructure,
  pickerFields: PickerNodeStructure,
  textFields: TextFieldNodeStructure,
  contactInfoFields: ContactInfoNodeStructure,
  addressInfoFields: AddressGroupNodeStructure,
};

const edgeTypes = { buttonedge: ButtonEdge };

const Flow = () => {
  const location = useLocation();
  const reactFlowWrapper = useRef(null);
  const { setViewport } = useReactFlow();
  const [open, setOpen] = useState(false);
  const [edgeData, setEdgeData] = useState("");
  const [nodeHeight, setNodeHeight] = useState();
  const [openDelete, setDelete] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [isAdded, setAdded] = useNodesState(false);
  const [addNewFlow, setAddNewFlow] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const [loading, setLoading] = useNodesState(false);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const newFName = localStorage.getItem("NewFlowName");
  const flwoJson = JSON.parse(localStorage.getItem("flowJSON"));
  let previousPath = location?.state?.from?.pathname;

  useEffect(() => {
    clearSelectedFrame();
    localStorage.removeItem("selectedFrame");
  }, []);

  useEffect(() => {
    if (newFName && flwoJson) {
      const temp = flwoJson.find((f) => f.flowName === newFName);
      if (temp) {
        localStorage.removeItem("NewFlowName");
        generateFlow(temp);
      }
    }
  }, [flwoJson]);

  useEffect(() => restorePreviouseFlow(), [previousPath]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: false,
            type: "buttonedge",
            style: { stroke: "black" },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onAdd = useCallback(
    (Icon, Name, type, uId, position = {}, isTopFrame) => {
      let pId;
      let newNodes = [];
      const randomPos = Number((Math.random(Math.floor()) * 750).toFixed(0));
      if (isTopFrame) {
        let wFrame;
        let frameNumber = Number(Name.split("-")[1]);
        frameNumber === 1
          ? (wFrame = Workflow_1)
          : frameNumber === 2
          ? (wFrame = Workflow_2)
          : (wFrame = Workflow_3);

        const frameId = `question-group-${uuidv4()}`;
        newNodes = addFrame(frameId, Icon, Name, position, wFrame);
      } else {
        switch (type) {
          case "new-sub":
            newNodes = newSubNode(uId, Name);
            break;

          case "bool":
            pId = `bool-group-${uuidv4()}`;
            newNodes = boolNodes(uId, pId, position);
            setNodeHeight(250);
            setAdded(true);
            break;

          case "choice":
            pId = `choice-group-${uuidv4()}`;
            newNodes = choiceNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "text":
            pId = `text-group-${uuidv4()}`;
            newNodes = textNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "email":
            pId = `email-${uuidv4()}`;
            newNodes = emailNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "dob":
            pId = `dob-${uuidv4()}`;
            newNodes = dobNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "phone":
            pId = `phone-${uuidv4()}`;
            newNodes = phoneNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "address":
            pId = `address-${uuidv4()}`;
            newNodes = addressNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "picker":
            pId = `picker-group-${uuidv4()}`;
            newNodes = pickerNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "range":
            pId = `range-group-${uuidv4()}`;
            newNodes = rangeNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "group":
            pId = `cluster-group-${uuidv4()}`;
            newNodes = groupNodes(uId, pId, position);
            uId && setNodeHeight(350);
            setAdded(true);
            break;

          case "contact-info-group":
            pId = `contact-info-group-${uuidv4()}`;
            newNodes = contactInfo(uId, pId, position);
            uId && setNodeHeight(400);
            setAdded(true);
            break;

          case "address-group":
            pId = `address-group-${uuidv4()}`;
            newNodes = addressGroupNodes(uId, pId, position);
            uId && setNodeHeight(560);
            setAdded(true);
            break;

          case "authorization":
            pId = `authorization-${uuidv4()}`;
            newNodes = authNodes(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "declaration":
            pId = `declaration-${uuidv4()}`;
            newNodes = declarationNode(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "information":
            pId = `information-${uuidv4()}`;
            newNodes = informationNode(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "currency":
            pId = `currency-${uuidv4()}`;
            newNodes = currencyNode(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "ssn":
            pId = `ssn-${uuidv4()}`;
            newNodes = ssnNode(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "pickerState":
            pId = `picker-group-${uuidv4()}`;
            newNodes = pickerState(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "pickerStateLicenced":
            pId = `picker-group-${uuidv4()}`;
            newNodes = pickerStateLicenced(uId, pId, position);
            uId && setNodeHeight(250);
            setAdded(true);
            break;

          case "photo":
            pId = `photo-${uuidv4()}`;
            newNodes = photoNode(uId, pId, position);
            uId && setNodeHeight(240);
            setAdded(true);
            break;

          case "newGroup":
            pId = `question-group-${uuidv4()}`;
            newNodes = newGroup(uId, pId, position);
            setNodeHeight(0);
            setAdded(true);
            break;

          case "upload":
            pId = `upload-${uuidv4()}`;
            newNodes = uploadNodes(uId, pId, position);
            uId && setNodeHeight(370);
            setAdded(true);
            break;

          default:
            pId = `${uId}-blank-${uuidv4()}`;
            newNodes = [
              {
                id: pId,
                type: "outerNode",
                data: { icon: "", label: Name, isConnectable: true },
                position: { x: randomPos, y: randomPos + 175 },
                className: "outer-group",
                style: { width: 375, height: 100 },
              },
            ];
            break;
        }
      }

      setNodes((nds) => nds.concat(...newNodes));
      // const edgeParents = newNodes.filter((item) => item.target);
      // newNodes.forEach((item) => {
      //   edgeParents.forEach((ele) => {
      //     if (ele.target === item.draggableId) {
      //       const obj = {
      //         id: `reactflow__edge-${ele.id}-${item.id}`,
      //         source: ele.id,
      //         target: item.id,
      //         type: "step",
      //         data: edges,
      //         markerEnd: { type: MarkerType.ArrowClosed },
      //         style: { stroke: "grey" },
      //         animated: false,
      //       };
      //       // setEdges((eds) => addEdge(obj, eds));
      //     }
      //   });
      // });
      type === "workflow-frame" ? setFrameBorder(1000) : setFrameBorder(5000);
    },
    [setNodes]
  );

  useEffect(() => {
    isAdded && updatedFrameHeight(nodes, nodeHeight, true);

    if (rfInstance) {
      localStorage.setItem("flow", JSON.stringify(rfInstance.toObject()));
    }
  }, [isAdded]);

  const updatedFrameHeight = (data, value, isNewAdded) => {
    let parentFrame = JSON.parse(localStorage.getItem("selectedFrame"));
    const found = data.findIndex((n) => n.id === parentFrame?.id);
    if (parentFrame?.id.startsWith("question-group")) {
      parentFrame.style.height += value;
      data[found].style.height = parentFrame.style.height;
    } else {
      // const index = data.findIndex((n) => n.id === parentFrame?.parentNode);
      // if (data[index].id.startsWith("question-group")) {
      //   data[index].style.height += value;
      // } else {
      //   const newindex = data.findIndex(
      //     (n) => n.id === data[index]?.parentNode
      //   );
      //   data[newindex].style.height += value;
      // }
    }
    localStorage.setItem("selectedFrame", JSON.stringify(parentFrame));
    isNewAdded && setAdded(false);
  };

  const restorePreviouseFlow = useCallback(
    (isCloudSync) => {
      localStorage.removeItem("editable");
      isCloudSync && (previousPath = "");
      setLoading(true);
      setNodes([]);
      setEdges([]);
      setTimeout(() => {
        let flow;
        if (previousPath === "/preview") {
          flow = JSON.parse(localStorage.getItem("previewData"));
        } else if (isCloudSync) {
          flow = JSON.parse(localStorage.getItem("flowJSON"));
        }
        if (flow) {
          previousPath !== "/preview" && (flow = flow[flow.length - 1]);
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
          setFrameBorder(150);
        }
        setLoading(false);
        clearSelectedFrame();
      }, 100);
    },
    [setEdges, setNodes, setViewport]
  );

  const generateFlow = (flow) => {
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      setFrameBorder(150);
    }
  };

  const constructJSON = useCallback(
    (fileName, oldFileName, type) => {
      const random =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(23).substring(2, 5);
      if (rfInstance) {
        const flow = rfInstance.toObject();
        let savedFlow = JSON.parse(localStorage.getItem("flowJSON"));
        let myArr = [];
        const currentFlowName = localStorage.getItem("CurrentFlowName");
        const newFlowName = localStorage.getItem("NewFlowName");
        let fileIndex = savedFlow?.findIndex(
          (f) => f.flowName === currentFlowName || f.flowName === newFlowName
        );
        const index = savedFlow?.findIndex((f) => f.flowName === oldFileName);
        if (
          !type &&
          savedFlow &&
          index !== -1 &&
          oldFileName !== "" &&
          oldFileName !== undefined
        ) {
          savedFlow[index].nodes = flow.nodes;
          savedFlow[index].edges = flow.edges;
          savedFlow[index].viewport = flow.viewport;
          localStorage.setItem("flowJSON", JSON.stringify(savedFlow));
        } else if (
          !type &&
          savedFlow &&
          fileIndex !== -1 &&
          oldFileName !== "New Flow"
        ) {
          savedFlow[fileIndex].nodes = flow.nodes;
          savedFlow[fileIndex].edges = flow.edges;
          savedFlow[fileIndex].flowName = fileName;
          savedFlow[fileIndex].viewport = flow.viewport;
          // localStorage.setItem("CurrentFlowName", fileName);
          localStorage.setItem("flowJSON", JSON.stringify(savedFlow));
        } else if (
          fileName !== undefined &&
          (oldFileName === "" || oldFileName === undefined)
        ) {
          fileName = type === "Copy" ? `${fileName} Copy` : fileName;
          flow.flowName = fileName;
          if (savedFlow) myArr = [...savedFlow, flow];
          else myArr = [flow];
          localStorage.setItem("flowJSON", JSON.stringify(myArr));
          const json = JSON.stringify(flow, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const href = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = href;
          link.download = fileName ? fileName : `Flow ${random}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        }
      }
    },
    [rfInstance]
  );

  const NodeDetect = (_, node) => {
    let editableData = [];
    if (node?.parentNode === undefined) {
      editableData.push(node);
    } else if (node?.className === "outer-group") {
      editableData.push(node);
    } else {
      const tempNodes = nodes.find((f) => f.id === node.parentNode);
      editableData.push(tempNodes);
    }
    localStorage.setItem("selectedFrame", JSON.stringify(node));
    localStorage.setItem("editable", JSON.stringify(editableData));
    localStorage.setItem("flow", JSON.stringify(rfInstance.toObject()));
  };

  const onNodeDelete = () => {
    localStorage.removeItem("previewData");
    localStorage.removeItem("editable");
    localStorage.removeItem("selectedFrame");
  };

  const clearWorkFlow = () => {
    setNodes([]);
    setEdges([]);
    setViewport({ x: 0, y: 0, zoom: 1 });
    localStorage.removeItem("previewData");
    localStorage.removeItem("selectedFrame");

    clearSelectedFrame();
  };

  const clearSelectedFrame = () => {
    localStorage.removeItem("editable");
    localStorage.removeItem("flow");
  };

  const triggerEvent = (value) => {
    if (value === "add") {
      clearWorkFlow();
      setAddNewFlow(true);
      // constructJSON();
    } else if (value === "download") {
      setAddNewFlow(false);
      setSaveOpen(true);
    } else if (value === "previous") {
      restorePreviouseFlow(true);
    }
  };

  const fromUpdate = (value, isSpecialType, data) => {
    if (isSpecialType === "Delete") {
      let remainNodes = nodes.filter(
        (f) => f.id !== value && f.parentNode !== value
      );
      setNodes(remainNodes);
    } else {
      setNodes([]);
      clearSelectedFrame();
      const nodeGap = data.margin * data.value;
      setTimeout(() => {
        setNodes(value);
        localStorage.setItem("flow", JSON.stringify(rfInstance.toObject()));
        !isSpecialType
          ? updatedFrameHeight(value, nodeGap, false)
          : updatedFrameHeight(value, 0, true);
      }, 500);
    }
    setFrameBorder(1000);
  };

  const setFrameBorder = (time) => {
    setTimeout(() => {
      document.querySelectorAll(".outer-group").forEach((el) => {
        el.style.border = "1px solid #aaa";
        el.style.borderRadius = "1rem";
        el.style.boxShadow =
          "0px 8px 9px -5px rgba(0,0,0,0), 0px 15px 22px 2px rgba(0,0,0,0.04), 0px 6px 28px 5px rgba(0,0,0,0.08)";
      });
    }, time);
  };

  const onEdgeClick = (event, edge) => {
    setDelete(true);
    setEdgeData(edge);
  };

  const handleDeleteEdge = () => {
    let remainingEdges = edges.filter((f) => f.id !== edgeData.id);
    setEdges(remainingEdges);
    setDelete(false);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const eventType = event.dataTransfer.getData("application/reactflow");
      if (typeof eventType === "undefined" || !eventType) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      setTimeout(() => {
        const { icon, title, type, id } = JSON.parse(
          localStorage.getItem("fromCards")
        );

        try {
          const selectedNode = JSON.parse(localStorage.getItem("editable"));

          if (selectedNode && selectedNode[0].data.type === "newGroup") {
            const selectedFrame = JSON.parse(
              localStorage.getItem("selectedFrame")
            );
            let newFlow = JSON.parse(localStorage.getItem("flow"));
            const nodes = newFlow?.nodes;
            let positionY = 0;
            if (selectedFrame)
              if (selectedFrame?.id.startsWith("question-group")) {
                positionY = selectedFrame?.position?.y;
              } else {
                const childNode = nodes.find(
                  (f) => f.id === selectedFrame.parentNode
                );
                if (childNode?.id.startsWith("question-group")) {
                  positionY = childNode?.position?.y;
                } else {
                  positionY = nodes.find((f) => f.id === childNode.parentNode)
                    ?.position.y;
                }
              }

            position.y -= positionY;
            position.x = 25;

            let height = 0;
            type === "group" || type === "contact-info-group"
              ? (height = 360)
              : type === "address-group"
              ? (height = 570)
              : type === "upload"
              ? (height = 380)
              : type === "newGroup"
              ? (height = 0)
              : (height = 260);

            let frameAllChild = [];
            if (newFlow && type !== "workflow-frame") {
              selectedFrame?.parentNode === undefined
                ? (frameAllChild = nodes?.filter(
                    (f) => f.parentNode === selectedFrame?.id
                  ))
                : (frameAllChild = nodes?.filter(
                    (f) => f.parentNode === selectedFrame?.parentNode
                  ));
              frameAllChild?.forEach((a) => {
                if (a.position.y > position.y) {
                  const index = nodes.findIndex((f) => f.id === a.id);
                  nodes[index].position.y += height;
                }
              });
              newFlow.nodes = nodes;
              localStorage.setItem("flow", JSON.stringify(newFlow));
              nodes && setNodes(nodes);
            }

            onAdd(icon, title, type, selectedFrame.id, position);
            localStorage.removeItem("editable");
            localStorage.removeItem("fromCards");
            return;
          }
        } catch (e) {}
        onAdd(icon, title, type, id, position);

        localStorage.removeItem("fromCards");
      }, 200);
    },
    [rfInstance]
  );

  return (
    <DashboardContext.Provider
      value={{
        rfInstance,
        setSaveOpen,
        triggerEvent,
        generateFlow,
        constructJSON,
        saveOpen,
        addNewFlow,
        setAddNewFlow,
      }}
    >
      <Loader value={loading} />
      <Navbar />

      <Stack direction="row" borderTop={"1px solid #bfb2b2"}>
        <Box
          width={"15%"}
          id="buttons-stack"
          height={"calc(100vh - 66px)"}
          sx={{ backgroundColor: "rgb(17, 24, 39)" }}
        >
          <DraggableCards />
        </Box>
        <Box height={"calc(100vh - 66px)"} width={"65%"} bgcolor={"aliceblue"}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            minZoom={0.08}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            onInit={setRfInstance}
            ref={reactFlowWrapper}
            onDragOver={onDragOver}
            onNodeClick={NodeDetect}
            elementsSelectable={true}
            onEdgeClick={onEdgeClick}
            onNodesDelete={onNodeDelete}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            className="border-start border-end"
            onNodeDragStop={() => localStorage.removeItem("selectedFrame")}
          >
            <Controls />
            <MiniMap />
            <Background color="#aaa" />
          </ReactFlow>
          <ConfirmationModel
            type="edgeModel"
            setDelete={setDelete}
            openDelete={openDelete}
            handleDelete={handleDeleteEdge}
          />
          <SaveModal />
        </Box>
        <Box
          width={"20%"}
          id="buttons-stack"
          bgcolor={"aliceblue"}
          height={"calc(100vh - 66px)"}
          borderLeft={"1px solid #bfb2b2"}
        >
          <UpdatePanel fromUpdate={fromUpdate} />
        </Box>
      </Stack>
      <SnackbarComp isOpen={open} setOpen={setOpen} from="dashboard" />
    </DashboardContext.Provider>
  );
};

const Dashboard = () => {
  return (
    <ReactFlowProvider>
      <Flow />
      <style>
        {`.react-flow__handle-right {
          right: ${"0px"};
        }`}
      </style>
    </ReactFlowProvider>
  );
};

export default Dashboard;

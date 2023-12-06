import React, { useContext, useEffect, useState } from "react";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../WorkFlowContext";

const selectStyle = {
  width: "240px",
  color: "white",
  "&:after": { borderColor: "#111827" },
  "& .MuiSvgIcon-root": { color: "white" },
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "& .css-1hnbzpj-MuiStack-root": { color: "white" },
};

const CustomButton = ({
  name,
  Icon,
  send,
  data,
  title,
  selectedFlow,
  constructJSON,
}) => {
  const navigate = useNavigate();
  const addEvent = (name) => {
    if (name === "preview") {
      localStorage.setItem("previewData", JSON.stringify(data.toObject()));
      navigate("/preview");
    } else if (name === "duplicate") {
      localStorage.removeItem("CurrentFlowName");
      constructJSON(selectedFlow, "", "Copy");
      send("duplicate");
    } else {
      name === "add"
        ? send("add")
        : name === "previous"
        ? send("previous")
        : send("download");
    }
  };

  return (
    <Tooltip title={title}>
      <IconButton
        size="large"
        color="inherit"
        variant="outlined"
        sx={{ mx: "0.7rem", color: "white" }}
        onClick={() => addEvent(name)}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

const Navbar = () => {
  const {
    rfInstance,
    saveOpen,
    setSaveOpen,
    triggerEvent,
    generateFlow,
    constructJSON,
  } = useContext(DashboardContext);

  const [val, setVal] = useState("New Flow");
  const currentFlowName = localStorage.getItem("CurrentFlowName");
  const newFlowName = localStorage.getItem("NewFlowName");
  const [allFlow, setAllFlow] = useState(
    JSON.parse(localStorage.getItem("flowJSON"))
  );
  const allWorkFlow = JSON.parse(localStorage.getItem("flowJSON"));
  const sendToParent = (value) => {
    if (value === "add") {
      setSaveOpen(true);
      setVal("New Flow");
      localStorage.removeItem("CurrentFlowName");
      localStorage.setItem("NewFlowName", "New Flow");
      triggerEvent("add");
    } else if (value === "previous") {
      triggerEvent("previous");
      allWorkFlow && setVal(allWorkFlow?.[allWorkFlow.length - 1]?.flowName);
    } else if (value === "duplicate") {
      allWorkFlow && setAllFlow(allWorkFlow);
    } else {
      localStorage.setItem("CurrentFlowName", val);
      triggerEvent("download");
    }
  };

  const handleOnChnage = (e) => {
    constructJSON("", val);
    localStorage.removeItem("NewFlowName");
    const value = e.target.value;
    setVal(value);
    localStorage.setItem("CurrentFlowName", value);
    allWorkFlow && generateFlow(allWorkFlow.find((f) => f.flowName === value));
  };

  useEffect(() => {
    if (newFlowName && newFlowName !== currentFlowName) {
      setVal(newFlowName);
    }
    allWorkFlow && setAllFlow(allWorkFlow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveOpen, localStorage.getItem("flowJSON")]);

  return (
    <Box
      className="p-2 d-flex justify-content-between align-items-center shadow-sm"
      bgcolor={"rgb(17, 24, 39)"}
    >
      <Box pb={1} px={1}>
        <FormControl
          variant="standard"
          sx={{ borderBottom: "1px solid white" }}
        >
          <InputLabel className="text-light " id="mylabel">
            Select Workflow
          </InputLabel>
          <Select
            labelId="mylabel"
            sx={selectStyle}
            size="small"
            value={val}
            onChange={handleOnChnage}
          >
            {allFlow &&
              allFlow?.map(({ flowName }, i) => (
                <MenuItem value={flowName} key={i}>
                  <Stack
                    sx={{ marginInline: "auto", width: "auto" }}
                    direction="row"
                    className="align-items-center"
                  >
                    {flowName}
                  </Stack>
                </MenuItem>
              ))}
            <MenuItem value={val}>
              <Stack
                sx={{ marginInline: "auto", width: "auto" }}
                direction="row"
                className="align-items-center"
              >
                {val}
              </Stack>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <CustomButton
          name={"add"}
          Icon={AddCircleIcon}
          send={sendToParent}
          title={"Add new flow"}
        />
        <CustomButton
          data={rfInstance}
          name={"preview"}
          title={"Preview"}
          Icon={SlideshowIcon}
        />
        <CustomButton
          name={"previous"}
          send={sendToParent}
          Icon={CloudSyncIcon}
          title={"Get Previous Flow"}
        />
        <CustomButton
          Icon={SaveIcon}
          name={"download"}
          title={"Save flow"}
          send={sendToParent}
        />
        <CustomButton
          name={"duplicate"}
          selectedFlow={val}
          send={sendToParent}
          Icon={ContentCopyIcon}
          title={"Create duplicate flow"}
          constructJSON={constructJSON}
        />
      </Box>
    </Box>
  );
};

export default Navbar;

import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { DashboardContext } from "../WorkFlowContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: 200,
  borderRadius: "12px",
  p: 4,
};

const SaveModal = () => {
  const { saveOpen, addNewFlow, setSaveOpen, setAddNewFlow, constructJSON } =
    useContext(DashboardContext);
  const newFlowName = localStorage.getItem("NewFlowName");
  const [val, setVal] = useState(addNewFlow ? "" : newFlowName);
  const flow = JSON.parse(localStorage.getItem("flowJSON"));
  const [errorMsg, setErrorMsg] = useState("");
  const currentFlowName = localStorage.getItem("CurrentFlowName");

  const handleOnChange = (e) => {
    setVal(e.target.value);
    const foundName = flow?.find((f) => f.flowName === e.target.value.trim());

    e.target.value.trim() === ""
      ? setErrorMsg("Please enter file name...")
      : foundName
      ? setErrorMsg("Please enter unique name...")
      : setErrorMsg("");
  };
  const handleSave = (e) => {
    if (val.trim() !== "" && errorMsg === "") {
      localStorage.setItem("NewFlowName", val.trim());
      if (!addNewFlow) {
        constructJSON(val.trim());
        setAddNewFlow(false);
      }
      setSaveOpen(false);
      setVal("");
    }
  };

  useEffect(() => {
    if (addNewFlow) setVal("");
    else if (currentFlowName) setVal(currentFlowName);
    else if (newFlowName) setVal(newFlowName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewFlow, saveOpen]);
  return (
    <Fragment>
      <Modal open={saveOpen} onClose={() => setSaveOpen(false)}>
        <Box sx={style}>
          <Box>
            <Typography
              mb={2}
              variant="h5"
              className="d-flex justify-content-center"
            >
              Please Enter Flow Name
            </Typography>
          </Box>
          <Grid className="d-flex justify-content-center">
            <Typography className="pt-1 px-2 fs-5 fw-5">Name :</Typography>
            <TextField
              error={errorMsg === "" ? false : true}
              size="small"
              value={val}
              helperText={errorMsg}
              onChange={handleOnChange}
            ></TextField>
          </Grid>
          <Grid
            className="d-flex justify-content-center"
            sx={{ p: errorMsg ? "15px" : "30px", gap: "20px" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setSaveOpen(false);
                setVal("");
                setErrorMsg("");
              }}
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default SaveModal;

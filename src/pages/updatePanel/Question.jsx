import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@material-ui/core";
import { Fragment, useContext, useEffect, useState } from "react";
import Actions from "../../components/Actions";
import { UpdateContext } from "../../WorkFlowContext";

const customStyle = { label: { fontSize: "14px" } };

const Question = ({ data, parentFrame, nodes, fromChild }) => {
  const { styles } = useContext(UpdateContext);
  const [temp, setTemp] = useState({ label: "", value: "" });
  const [error, setError] = useState(false);
  const [isRequire, setIsRequired] = useState(true);
  const [isPattern, setIsPattern] = useState(true);
  const [isMaxLen, setIsMaxLen] = useState(true);
  const [helpertext, setHelperText] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    setTemp({ label: data.label, value: data.value });
  }, [data.label, data.value]);

  const phonePattern = /^\d{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dobPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const StyledFormControlLabel = withStyles(customStyle)(FormControlLabel);

  const errorHandler = (errorVal, helperTextVal) => {
    setError(errorVal);
    setHelperText(helperTextVal);
  };

  const handleChange = (e) => {
    const tempVal = e.target.value;
    const name = e.target.name;
    if (tempVal.toString().trim() === "" && name === "label") {
      setErrMessage("Required fields***");
    } else if (
      tempVal.toString().trim() === "" &&
      isRequire &&
      data.validation
    ) {
      errorHandler(true, "Please enter value");
    } else if (data.validation === "email" && name === "value") {
      if (!emailPattern.test(tempVal.toString().trim()) && isPattern) {
        errorHandler(true, "Please enter valid email");
      } else {
        errorHandler(false, "");
      }
    } else if (data.validation === "phone" && name === "value") {
      if (!phonePattern.test(tempVal.toString().trim()) && isPattern) {
        errorHandler(true, "Please enter valid phone number");
      } else if (tempVal.length > 10 && isMaxLen) {
        errorHandler(true, "Plese enter maximum 10 digit");
      } else {
        errorHandler(false, "");
      }
    } else if (data.validation === "dob" && name === "value") {
      if (!dobPattern.test(tempVal) && isPattern) {
        errorHandler(true, "Please enter valid dob format");
      } else if (isPattern) {
        const parts = tempVal.split("/");
        const day = parseInt(parts[1], 10);
        const month = parseInt(parts[0], 10) - 1;
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        if (isNaN(date.getTime()) || date.getTime() > new Date().getTime()) {
          errorHandler(true, "Please enter valid dob");
        } else {
          const formattedDate = `${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${date.getFullYear().toString()}`;

          if (formattedDate === tempVal) {
            errorHandler(false, "");
          } else {
            errorHandler(true, "Please enter valid dob");
          }
        }
      } else {
        errorHandler(false, "");
      }
    } else if (
      isRequire &&
      data.value === "" &&
      name === "value" &&
      data.validation
    ) {
      errorHandler(true, "Please enter value");
    } else if (!isRequire && data.value === "") {
      setErrMessage("");
      errorHandler(false, "");
    } else {
      setErrMessage("");
    }
    setTemp({ ...temp, [name]: tempVal });
    name === "label" ? (data.label = tempVal) : (data.value = tempVal);
  };

  const handleSave = (parent) => {
    if (!temp.label) {
      fromChild();
    } else {
      const index = nodes.findIndex((node) => node.id === parent.id);
      nodes[index] = parent;
      fromChild(nodes, true);
    }
  };

  return (
    <Fragment>
      <TextField
        multiline
        name="label"
        size="small"
        className="m-2 rounded"
        value={
          temp.label.charAt(0).toUpperCase() + temp.label.slice(1).toLowerCase()
        }
        onChange={handleChange}
        sx={{ backgroundColor: "#f8f9fa" }}
        rows={temp.label.length > 50 ? 5 : 0}
      />

      <Typography
        variant="subtitle2"
        mx={2}
        className="text-danger text-start fw-bold"
      >
        {errMessage}
      </Typography>
      {data.type === "textFields" && (
        <TextField
          error={error}
          multiline
          size="small"
          name="value"
          value={temp.value}
          className={`m-2 rounded ${styles.root}`}
          onChange={handleChange}
          helperText={helpertext}
          sx={{ backgroundColor: "#f8f9fa" }}
          rows={temp.label.length > 50 ? 5 : 0}
        />
      )}
      {data.validation && (
        <Stack pl={3.5}>
          <StyledFormControlLabel
            label="Require"
            control={
              <Checkbox
                size="small"
                defaultChecked
                checked={isRequire}
                sx={{ color: "#1733ff !important", p: 0 }}
                onChange={() => setIsRequired(!isRequire)}
              />
            }
          />
          <StyledFormControlLabel
            label="Pattern"
            control={
              <Checkbox
                size="small"
                defaultChecked
                checked={isPattern}
                sx={{ color: "#1733ff !important", p: 0 }}
                onChange={() => setIsPattern(!isPattern)}
              />
            }
          />
          {data.validation === "phone" && (
            <StyledFormControlLabel
              label="Max length"
              control={
                <Checkbox
                  size="small"
                  defaultChecked
                  checked={isMaxLen}
                  sx={{ color: "#1733ff !important", p: 0 }}
                  onChange={() => setIsMaxLen(!isMaxLen)}
                />
              }
            />
          )}
        </Stack>
      )}

      {/* Save and Cancel Action Buttons */}
      {(data.type === "input" || data.type === "textFields") && (
        <Actions
          handleSave={handleSave}
          isVal={errMessage === "" ? helpertext : errMessage}
          fromChild={fromChild}
          parentFrame={parentFrame}
          isRequire={isRequire}
        />
      )}
    </Fragment>
  );
};

export default Question;

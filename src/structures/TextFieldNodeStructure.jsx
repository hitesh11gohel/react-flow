import { makeStyles } from "@material-ui/core";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import React, { Fragment, memo, useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const useStyles = makeStyles(() => ({
  root: { "& .MuiFilledInput-root": { background: "white" } },
}));

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      overwrite
      inputRef={ref}
      mask="(#00) 000-0000"
      definitions={{ "#": /[1-9]/ }}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextFieldComponents = ({ data }) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(data.value);
  const [dobValue, setDOBValue] = useState(dayjs(data.value));
  const [phoneVal, setPhoneVal] = useState(
    data.value === "" ? "(100) 000-0000" : data.value
  );

  const handleChange = (e, type) => {
    if (type === "phone") {
      setPhoneVal(e.target.value);
      data.value = e.target.value;
    } else if (type === "email") {
      setEmail(e.target.value);
      data.value = e.target.value;
      emailPattern.test(e.target.value) ? setError(false) : setError(true);
    } else {
      setDOBValue(e);
      e.$d && (data.value = `${e.$M + 1}/${e.$D}/${e.$y}`);
    }
  };

  return (
    <Fragment>
      {data.validation === "phone" && (
        <Box pl={5}>
          <FormControl variant="filled">
            <InputLabel htmlFor="formatted-text-mask-input">
              Phone number
            </InputLabel>
            <Input
              name="textmask"
              value={phoneVal}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              onChange={(e) => handleChange(e, "phone")}
            />
          </FormControl>
        </Box>
      )}
      {data.validation === "dob" && (
        <Box pl={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                value={dobValue}
                label="Date of birth"
                onChange={(e) => handleChange(e, "dob")}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      )}
      {data.validation === "email" && (
        <Box pl={2}>
          <TextField
            error={error}
            type="email"
            value={email}
            label="Email"
            onChange={(e) => handleChange(e, "email")}
            helperText={error ? "Plese enter valid email" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default memo(({ data, isConnectable }) => {
  const classes = useStyles();
  const onChange = useCallback((e) => (data.value = e.target.value), [data]);
  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ display: data.isConnectable ? "block" : "none" }}
      />
      <Stack>
        {data?.label && (
          <Typography
            variant="caption"
            className="text-truncate text-center fs-5"
            sx={{ fontWeight: 600 }}
          >
            {data?.label?.toUpperCase()}
          </Typography>
        )}
        <Box
          mx={"1.5rem"}
          mt={"3rem"}
          className="d-flex justify-content-center align-item-center"
        >
          {!data.validation ? (
            <TextField
              rows={3}
              multiline
              name="text"
              size="small"
              variant="filled"
              sx={{
                width: 525,
                borderTop: "1px solid #d7d7d7",
                borderLeft: "1px solid #b9b9b9",
              }}
              onChange={onChange}
              bgcolor={"aliceblue"}
              className={classes.root}
              defaultValue={data?.value}
              placeholder={data?.placeholder}
            />
          ) : (
            <TextFieldComponents data={data} />
          )}
        </Box>
      </Stack>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </Fragment>
  );
});

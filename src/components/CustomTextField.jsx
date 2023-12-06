import { TextField } from "@mui/material";
import { useContext } from "react";
import { UpdateContext } from "../WorkFlowContext";

const CustomTextField = ({ ele, helpertext, error, handleChange }) => {
  const { styles } = useContext(UpdateContext);

  return (
    <TextField
      size="small"
      error={error}
      name={ele.name}
      className={`rounded ${styles.root}`}
      sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
      //   className={`rounded ${styles.root} ${styles.textField}`}
      defaultValue={ele.label}
      placeholder={ele.placeholder ?? ""}
      onChange={(e) => handleChange(e, ele)}
      helperText={error ? helpertext : ""}
    />
  );
};

export default CustomTextField;

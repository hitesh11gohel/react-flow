import * as React from "react";
import {
  TextField,
  DialogActions,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { DefaultTypes } from "./InitialNodes";

const TextFieldComp = ({ n, v, e, change }) => {
  const isValid = e && v.length === 0;
  const Name = n.split("")[1];
  return (
    <TextField
      fullWidth
      name={n}
      value={v}
      error={isValid}
      onChange={change}
      size="small"
      variant="filled"
      sx={{ marginY: "1rem" }}
      placeholder={`Enter choice ${Name}`}
      helperText={isValid && `Choice ${Name} is required`}
    />
  );
};

const DefButton = ({ type, event, label, icon, Title, placeholder }) => (
  <Button
    fullWidth
    variant="outlined"
    color="inherit"
    onClick={() => event(type, icon, Title, placeholder)}
    sx={{ justifyContent: "left" }}
  >
    <Avatar src={icon} sx={{ width: 20, height: 20, mr: 1, p: "4px" }} />
    {label}
  </Button>
);

export default function AddNode({ sendToNode, total }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [Node, setNode] = React.useState({
    Title: "",
    Type: "",
    icon: "",
    placeholder: "",
    ChoiceQue: { c1: "", c2: "", c3: "", c4: "" },
  });
  const { c1, c2, c3, c4 } = Node.ChoiceQue;

  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    if (
      Node.Type === "choice" &&
      (c1 === "" || c2 === "" || c3 === "" || c4 === "")
    ) {
      setError(true);
    } else {
      sendToNode(
        Node.icon,
        Node.Title,
        Node.Type,
        Node.ChoiceQue,
        Node.placeholder,
        total.length
      );
      setNode({
        Title: "",
        placeholder: "",
        Type: "",
        ChoiceQue: { c1: "", c2: "", c3: "", c4: "" },
      });
      setOpen(false);
    }
  };

  const handleBtnClick = (Type, icon, Title, placeholder) => {
    setNode({ ...Node, Type, icon, Title, placeholder });
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    value.length === 0 ? setError(true) : setError(false);
    setNode({ ...Node, ChoiceQue: { ...Node.ChoiceQue, [name]: value } });
  };

  return (
    <div style={{ margin: "0 3rem" }}>
      <Stack spacing={2} my={2}>
        {DefaultTypes.map(({ label, value, icon, Title, placeholder }, i) => (
          <Box key={i}>
            <DefButton
              type={value}
              label={label}
              icon={icon}
              Title={Title}
              placeholder={placeholder}
              event={handleBtnClick}
            />
          </Box>
        ))}
      </Stack>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Avatar
              src={Node.icon}
              alt={Node.Type}
              sx={{ mr: 1, width: 24, height: 24, p: 1 }}
            />
            {`Create Node`}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginY: "1rem", width: 350 }}
            variant="standard"
            placeholder={Node.placeholder}
            value={Node.Title}
            onChange={({ target }) => setNode({ ...Node, Title: target.value })}
          />

          <Stack sx={{ display: Node.Type === "choice" ? "flex" : "none" }}>
            <TextFieldComp n={"c1"} v={c1} e={error} change={handleChange} />
            <TextFieldComp n={"c2"} v={c2} e={error} change={handleChange} />
            <TextFieldComp n={"c3"} v={c3} e={error} change={handleChange} />
            <TextFieldComp n={"c4"} v={c4} e={error} change={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!Node.Title || !Node.Type}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

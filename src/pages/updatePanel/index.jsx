import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import HelpIcon from "@mui/icons-material/Help";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModel from "../../components/ModelComp";
import { makeStyles } from "@material-ui/core";
import { UpdateContext } from "../../WorkFlowContext";
import EditContent from "./EditContent";
import { GroupTypeComp } from "./ComponentTypes";

const useStyles = makeStyles((theme) => ({
  helpIconstyle: { color: "#1733ff" },
  dividrCss: { borderWidth: "1px" },
  textField: { mx: 2, mb: 1, backgroundColor: "#f8f9fa" },
  rightBackImg: {
    backgroundImage:
      "linear-gradient(62deg, rgb(142, 197, 252) 0%, rgb(224, 195, 252) 100%)",
  },
  paperBackImg: {
    backgroundImage:
      "radial-gradient(1224px at 10.6% 8.8%, rgb(255, 255, 255) 0%, rgb(153, 202, 251) 100.2%)",
  },
  root: {
    "&  .MuiFormHelperText-root.Mui-error": {
      backgroundColor: theme.palette.background.default,
      backgroundImage:
        "linear-gradient(62deg, rgb(142, 197, 252) 0%, rgb(224, 195, 252) 100%)",
      margin: 0,
      paddingLeft: 10,
    },
  },
}));

const UpdatePanel = (props) => {
  const classes = useStyles();
  const flow = JSON.parse(localStorage.getItem("flow"));
  let nodes = flow?.nodes;
  const [blocks, setBlocks] = useState([]);
  const [blockBtns, setBlockBtns] = useState([]);
  const [isEditable, setEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [editId, setEditId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [nodeGap, setNodeGap] = useState({ value: 0, margin: 0 });
  const editableData = JSON.parse(localStorage.getItem("editable"));

  useEffect(() => {
    setBlocks(editableData ?? []);
    setEditable(false);
    setNodeGap({ value: 0, margin: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("editable")]);

  // useEffect(() => {}, [refresh]);

  const restore = () => {
    setBlocks([]);
    setBlockBtns([]);
    localStorage.removeItem("editable");
  };

  const handleEditClick = (data) => {
    const id = blocks.findIndex((f) => f.id === data.id);
    const node = blocks.find((f) => f.id === data.id);
    const type = data.data.type;
    localStorage.setItem("editHeading", JSON.stringify({ id, node }));
    setEditId(data.id);
    data.id.startsWith("question")
      ? setBlockBtns([])
      : setBlockBtns(nodes?.filter(({ parentNode }) => parentNode === data.id));

    if (type === "photoFields") {
      setBlockBtns(nodes?.filter(({ id }) => id === data.id));
    }

    if (
      blockBtns.length === 0 ||
      ["group", "contactInfoFields", "photoFields"].includes(type)
    ) {
      setBlockBtns(nodes.filter(({ parentNode }) => parentNode === data.id));
    }

    data.id !== editId ? setEditable(true) : setEditable(!isEditable);

    type === "choice" || type === "boolean"
      ? setIsDisabled(false)
      : setIsDisabled(true);
  };

  const handleDeleteNode = (data) => {
    fromChild(data.id, "Delete");
    setDelete(false);
  };

  const fromChild = (value, isSpecialType) => {
    if (value !== undefined) {
      props.fromUpdate(value, isSpecialType, nodeGap);
      nodes = value;
      restore();
    } else {
      setNodeGap({ value: 0, margin: 0 });
      const { id, node } = JSON.parse(localStorage.getItem("editHeading"));
      blocks[id] = node;
    }
    setEditId(null);
    setEditable(!isEditable);
    localStorage.removeItem("editHeading");
  };

  return (
    <UpdateContext.Provider value={{ styles: classes }}>
      <Stack direction="row" justifyContent="center">
        <Tooltip title="Restore">
          <IconButton
            color="inherit"
            onClick={() => restore()}
            sx={{ mt: 4, mx: 1, display: blocks?.length > 0 ? "flex" : "none" }}
          >
            <RestoreIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack className="d-flex justify-content-center align-items-center p-3">
        {blocks &&
          blocks.length > 0 &&
          blocks[0]?.data?.type !== "newGroup" && (
            <Box
              width={300}
              height={"auto"}
              bgcolor={"aliceblue"}
              className="d-flex justify-content-center align-items-center p-1 text-center border border-dark rounded-3"
            >
              <Box
                width={290}
                height={"auto"}
                className={`m-2 border border-none rounded-3 ${classes.rightBackImg}`}
              >
                <Box className="p-2 d-flex justify-content-evenly align-items-center">
                  <HelpIcon sx={{ ml: 1, color: "#1733ff" }} />
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: "black", fontWeight: 900 }}
                  >
                    Workflow
                  </Typography>
                  <Box sx={{ width: "25px" }}></Box>
                </Box>

                {blocks.map((item, i) => {
                  const dataLabel =
                    item.data.label.charAt(0).toUpperCase() +
                    item.data.label.slice(1).toLowerCase();
                  const isEditModeOn = editId === item.id && isEditable;
                  return (
                    <Box key={i}>
                      {!isEditModeOn && item?.data?.label && (
                        <Paper
                          className={`m-2 my-5 p-2 shadow ${classes.paperBackImg}`}
                        >
                          <Box className="d-flex justify-content-end align-items-center">
                            <Tooltip title="Update">
                              <IconButton onClick={() => handleEditClick(item)}>
                                <EditIcon
                                  color={isEditModeOn ? "primary" : "inherit"}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton onClick={() => setDelete(true)}>
                                <DeleteIcon
                                  color={isEditModeOn ? "primary" : "inherit"}
                                />
                              </IconButton>
                            </Tooltip>
                            <ConfirmationModel
                              item={item}
                              type="nodeModel"
                              setDelete={setDelete}
                              openDelete={openDelete}
                              handleDelete={handleDeleteNode}
                            />
                          </Box>
                          <Tooltip title={dataLabel}>
                            <Typography sx={{ py: 1 }}>
                              {dataLabel.length > 50
                                ? `${dataLabel.substr(0, 50)}...`
                                : dataLabel}
                            </Typography>
                          </Tooltip>
                          {item.type === "textFields" && (
                            <TextField
                              disabled
                              multiline
                              size="small"
                              value={item.data.value}
                              rows={item.data.value.length > 50 ? 3 : 0}
                            />
                          )}
                          <Stack>
                            {nodes
                              ?.filter(
                                ({ parentNode }) => parentNode === item.id
                              )
                              .map((ele) => {
                                let { data, type } = ele;
                                return data.label || data.label === "" ? (
                                  <Box key={ele.id}>
                                    {type === "photoFields" && (
                                      <Avatar
                                        variant="square"
                                        src={data.value}
                                        sx={{ height: 100, width: 100 }}
                                        className="d-flex justify-content-center mx-auto"
                                      />
                                    )}
                                  </Box>
                                ) : data.options ? (
                                  <Box key={ele.id}>
                                    <Select
                                      fullWidth
                                      disabled
                                      size="small"
                                      className="my-2"
                                      variant="filled"
                                      value={data.value}
                                    >
                                      <MenuItem value={data.value}>
                                        {
                                          data.options.find(
                                            (f) => f.value === data.value
                                          ).label
                                        }
                                      </MenuItem>
                                    </Select>
                                  </Box>
                                ) : (
                                  <Box key={ele.id}>
                                    <GroupTypeComp
                                      ele={data}
                                      isGroupType={data.type}
                                      isSlider={type === "rangeFields" ? 1 : 0}
                                    />
                                  </Box>
                                );
                              })}
                          </Stack>
                        </Paper>
                      )}

                      {isEditModeOn && (
                        <EditContent
                          nodes={nodes}
                          flow={flow}
                          item={item}
                          nodeGap={nodeGap}
                          setNodeGap={setNodeGap}
                          refresh={refresh}
                          setRefresh={setRefresh}
                          blockBtns={blockBtns}
                          setBlockBtns={setBlockBtns}
                          classes={classes}
                          isDisabled={isDisabled}
                          fromChild={fromChild}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
      </Stack>
    </UpdateContext.Provider>
  );
};

export default UpdatePanel;

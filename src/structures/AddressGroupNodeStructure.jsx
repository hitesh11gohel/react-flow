import { makeStyles } from "@material-ui/core";
import { MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Fragment, memo, useCallback, useState } from "react";

const useStyles = makeStyles(() => ({
  root: { "& .MuiFilledInput-root": { background: "white" } },
}));

export const AddressGroupType = ({ data, onChange, onChangeText }) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(null);

  const handleSelectClick = (index) => {
    setOpenMenu(index === openMenu ? null : index);
  };

  return data.items.map((item, index) =>
    item.type === "place" || item.type === "text" ? (
      <TextField
        key={index}
        variant="filled"
        name={item.fieldId}
        size="small"
        className={classes.root}
        onChange={onChangeText}
        placeholder={item.placeholder}
        sx={{ width: "500px", my: "5px" }}
        defaultValue={item?.label}
      />
    ) : item.type === "picker" ? (
      <Select
        key={index}
        variant="filled"
        name={item.fieldId}
        size="small"
        className="nodrag"
        onChange={onChange}
        sx={{ width: "500px", overflowY: "auto" }}
        defaultValue={item.value}
        onClose={() => setOpenMenu(null)}
        open={openMenu === index}
        onClick={() => handleSelectClick(index)}
      >
        {item.options.map(({ label, value }, i) => (
          <MenuItem key={i} value={value}>
            <Typography className="text-truncate" sx={{ width: "450px" }}>
              {label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    ) : null
  );
};

export default memo(({ data }) => {
  const onChange = useCallback(
    (e) => {
      data.value = e.target.value;
      data.items.find((f) => f.fieldId === e.target.name).value =
        e.target.value;
    },
    [data]
  );

  const onChangeText = useCallback(
    (e) => {
      return (data.items.find((f) => f.fieldId === e.target.name).label =
        e.target.value);
    },
    [data]
  );
  return (
    <Fragment>
      <Stack>
        {data?.label && (
          <Typography variant="caption" textAlign={"center"}>
            {data?.label?.toUpperCase()}
          </Typography>
        )}
        <Stack marginY={"1rem"} paddingLeft={2} paddingTop={3}>
          <AddressGroupType
            data={data}
            onChange={onChange}
            onChangeText={onChangeText}
          />
        </Stack>
      </Stack>
    </Fragment>
  );
});

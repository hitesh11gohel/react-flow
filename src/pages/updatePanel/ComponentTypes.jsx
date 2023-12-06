import { Fragment } from "react";
import CustomTextField from "../../components/CustomTextField";
import { options, stateOptions } from "../../assets";
import {
  Avatar,
  Box,
  Grid,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from "@mui/material";

export const SliderComp = ({ ele }) => (
  <Box p={1} pt={3}>
    <Slider
      marks
      disabled
      min={50000}
      step={25000}
      max={2500000}
      className="nopan"
      valueLabelDisplay="on"
      defaultValue={ele.value}
      sx={{ color: "inherit" }}
      getAriaValueText={(value) => value}
      onChange={(e) => (ele.value = e.target.value)}
    />
  </Box>
);

export const GroupNodes = ({ ele }) => (
  <Fragment>
    {ele &&
      ele.items.map((item, key) =>
        item.type === "text" || item.type === "place" ? (
          <TextField
            key={key}
            disabled
            size="small"
            margin="dense"
            name={item.name}
            defaultValue={item?.label}
            placeholder={item.placeholder}
          />
        ) : item.type === "row" ? (
          item.items.map((item, key) => (
            <TextField
              key={key}
              disabled
              size="small"
              margin="dense"
              name={item.name}
              defaultValue={item?.label}
              placeholder={item.placeholder}
            />
          ))
        ) : item.type === "picker" ? (
          <Select
            key={key}
            fullWidth
            disabled
            size="small"
            className="my-2"
            defaultValue={item?.value}
          >
            <MenuItem value={item?.value}>
              {item.options.find((f) => f.value === item.value).label}
            </MenuItem>
          </Select>
        ) : null
      )}
  </Fragment>
);

export const ContactInfoGroup = ({ ele }) => (
  <Fragment>
    {ele.items.map((item, i) => (
      <TextField
        key={i}
        disabled
        size="small"
        margin="dense"
        defaultValue={item.label}
        placeholder={item.placeholder}
      />
    ))}
  </Fragment>
);

export const AddressGroup = ({ ele }) => {
  const AddressTextField = ({ name, data, onChange }) => (
    <TextField
      variant="filled"
      name={name}
      size="small"
      onChange={onChange}
      placeholder={name}
      sx={{ width: "300px", my: "5px" }}
      defaultValue={data?.value[name]}
    />
  );

  const AddressSelect = ({ name, data, options }) => (
    <Select
      variant="filled"
      name={name}
      size="small"
      className="nodrag"
      onChange={(e) => (ele.value[name] = e.target.value)}
      sx={{ width: "300px", overflowY: "auto", textAlign: "left" }}
      defaultValue={data?.value[name]}
    >
      {options.map(({ label, value }, i) => (
        <MenuItem key={i} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
  return (
    <Stack>
      <AddressTextField name="addressLookup" data={ele} />
      <AddressTextField name="streetAddress" data={ele} />
      <AddressSelect name="unitType" data={ele} options={options} />
      <AddressTextField name="unit" data={ele} />
      <AddressTextField name="city" data={ele} />
      <AddressSelect name="state" data={ele} options={stateOptions} />
      <AddressTextField name="zip" data={ele} />
    </Stack>
  );
};

export const GroupTypeComp = ({ ele, isSlider, isGroupType }) => {
  return isSlider ? (
    <SliderComp ele={ele} />
  ) : isGroupType === "group" ? (
    <GroupNodes ele={ele} />
  ) : isGroupType === "contact-info-group" ? (
    <ContactInfoGroup ele={ele} />
  ) : isGroupType === "address-group" ? (
    <AddressGroup ele={ele} />
  ) : (
    <TextField
      multiline
      rows={4}
      defaultValue={ele.value}
      onChange={(e) => (ele.value = e.target.value)}
    />
  );
};

export const RangeFieldsComp = ({ action }) => (
  <Box px={4} pb={1}>
    <Slider
      marks
      step={25000}
      min={50000}
      max={2500000}
      className="nopan"
      valueLabelDisplay="auto"
      sx={{ color: "inherit", p: 0 }}
      defaultValue={action.data.value}
      getAriaValueText={(value) => value}
      onChange={(e) => (action.data.value = e.target.value)}
    />
  </Box>
);

export const PickerFieldsComp = ({ action, handleChange }) => (
  <Box pb={1}>
    {action?.data?.options?.map((item, i) => (
      <TextField
        key={i}
        size="small"
        className="rounded"
        sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
        name={String(item.value)}
        defaultValue={item.label}
        onChange={(e) => handleChange(e, item)}
      />
    ))}
  </Box>
);

export const ContactInfoFieldsComp = ({ action, error, handleChange }) => (
  <Box pb={1}>
    {action?.data?.items?.map((item, i) =>
      i === 3 ? (
        <CustomTextField
          key={i}
          ele={item}
          helpertext="Please enter valid suffix (Only alpha)"
          error={error.suffix}
          handleChange={handleChange}
        />
      ) : (
        <TextField
          key={i}
          size="small"
          className="rounded"
          sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
          name={String(item.name)}
          defaultValue={item.label}
          placeholder={item.placeholder ?? ""}
          onChange={(e) => handleChange(e, item)}
        />
      )
    )}
  </Box>
);

export const UploadComp = ({ handleChange }) => (
  <Box px={4} pb={1}>
    <TextField
      type="file"
      name="imageUpload"
      className="rounded"
      onChange={(e) => handleChange(e, "")}
    />
  </Box>
);

export const GroupFieldsComp = ({ action, error, handleChange }) => (
  <Box pb={1}>
    <CustomTextField
      ele={action?.data?.items[0]}
      helpertext="Please enter valid number"
      error={error.rowPhone}
      handleChange={handleChange}
    />
    <CustomTextField
      ele={action?.data?.items[1]?.items[0]}
      helpertext="Please enter alpha numeric value"
      error={error.rowQ1}
      handleChange={handleChange}
    />
    <CustomTextField
      ele={action?.data?.items[1]?.items[1]}
      helpertext={"Please enter alpha numeric value"}
      error={error.rowQ2}
      handleChange={handleChange}
    />
  </Box>
);

export const PhotoFieldComp = ({ image, handleChange }) => (
  <Grid>
    <Box px={9} pb={1}>
      <Avatar
        src={image}
        variant="square"
        sx={{ height: "100px", width: "100px" }}
      />
    </Box>
    <Box px={4} pb={1}>
      <TextField
        type="file"
        name="image"
        className="rounded"
        onChange={(e) => handleChange(e, "")}
      />
    </Box>
  </Grid>
);

export const AddressInfoFields = ({
  action,
  error,
  handleChange,
  pickerChange,
}) => (
  <Box pb={1}>
    <CustomTextField
      ele={action?.data?.items[1]}
      helpertext="Please enter alpha numeric value"
      error={error.street}
      handleChange={handleChange}
    />

    <TextField
      size="small"
      name={
        action?.data?.items[2].options.find(
          (f) => f.value === action?.data?.items[2].value
        )?.value
      }
      className="rounded"
      sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
      defaultValue={
        action?.data?.items[2].options.find(
          (f) => f.value === action?.data?.items[2].value
        )?.label
      }
      onChange={(e) => {
        action?.data?.items[2].type === "picker"
          ? pickerChange(e, action?.data?.items[2])
          : handleChange(e, action?.data?.items[2]);
      }}
    />
    <CustomTextField
      ele={action?.data?.items[3]}
      helpertext="Please enter alpha numeric value"
      error={error.unit}
      handleChange={handleChange}
    />
    <CustomTextField
      ele={action?.data?.items[4]}
      helpertext="Please enter alpha numeric value"
      error={error.city}
      handleChange={handleChange}
    />
    <TextField
      size="small"
      name={
        action?.data?.items[5].options.find(
          (f) => f.value === action?.data?.items[5].value
        )?.value
      }
      className="rounded"
      sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
      defaultValue={
        action?.data?.items[5].options.find(
          (f) => f.value === action?.data?.items[5].value
        )?.label
      }
      onChange={(e) => {
        action?.data?.items[5].type === "picker"
          ? pickerChange(e, action?.data?.items[5])
          : handleChange(e, action?.data?.items[5]);
      }}
    />
    <CustomTextField
      ele={action?.data?.items[6]}
      helpertext="Please enter valid zip code"
      error={error.zip}
      handleChange={handleChange}
    />
  </Box>
);

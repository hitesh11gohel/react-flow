import React, { Fragment, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Actions from "../../components/Actions";
import {
  AddressInfoFields,
  ContactInfoFieldsComp,
  GroupFieldsComp,
  PhotoFieldComp,
  PickerFieldsComp,
  RangeFieldsComp,
} from "./ComponentTypes";
import { imageReader } from "../../components/ImageReader";

const NodeTypes = (props) => {
  const { parentFrame, action, nodes, fromChild, count } = props;
  const [field, setField] = useState([]);
  const [isVal, setIsVal] = useState(false);
  const [image, setImage] = useState(action[0]?.data?.value);
  const [error, setError] = useState({
    rowQ1: false,
    rowQ2: false,
    street: false,
    unit: false,
    city: false,
    zip: false,
    suffix: false,
    rowPhone: false,
  });

  const pickerChange = (e) => {
    const { name, value } = e.target;
    let { items } = field[0].data;
    value === "" ? setIsVal(true) : setIsVal(false);
    let obj = items.find((f) => f.type === "picker" && f.value === name);
    obj.options.find((f) => f.value === name).label = value;

    items
      .filter((f) => f.type === "picker")
      .map((m) => {
        const blankLbl = m.options.find((l) => l.label === "");
        return blankLbl !== undefined ? setIsVal(true) : "";
      });
  };

  const handleChange = (e, data) => {
    const { name, value } = e.target;
    let { options, items } = field[0].data;

    if (data !== "") {
      options?.forEach((ele) => {
        if (ele.value.toString() === name.toString()) ele.label = value;
      });
      items?.forEach((ele) => {
        if (ele.type === "row") {
          ele.items.forEach((item) => {
            if (item.name.toString() === name.toString()) item.label = value;
          });
        } else if (ele.type === "picker") {
          if (ele.value === name) {
            ele.label = value;
            ele.options.find((f) => f.value === ele.value).label = value;
          }
        } else {
          if (ele.name.toString() === name.toString()) ele.label = value;
        }
      });

      const blankLabelOpt = options?.filter(
        (elm) => elm.label.toString().trim() === ""
      );
      blankLabelOpt && blankLabelOpt.length > 0
        ? setIsVal(true)
        : setIsVal(false);
      data.label = e.target.value;
    } else {
      if (name === "image") {
        imageReader(field[0].data, e.target.files[0], setImage);
      } else {
        if (name === "imageUpload") {
          field[0].data.flag = true;
          imageReader(field[0].data, e.target.files[0], setImage);
        } else {
          let found = field.find(
            (f) => f.data.value.toString() === name.toString()
          );
          const filtered = field.filter(
            (f) => f.data.value.toString() !== name.toString()
          );
          found.data.label = value;
          setField([...filtered, found]);
          const blanklabel = field.find((f) => f.data.label === "");
          e.target.value === "" || blanklabel
            ? setIsVal(true)
            : setIsVal(false);
        }
      }
    }

    if (
      field[0].data.type === "group" ||
      field[0].data.type === "contact-info-group"
    )
      handleError(name, value);
  };

  const handleError = (name, value) => {
    const phonePattern = /^\d{10}$/;
    const aplhaNumericReg = /^[a-zA-Z0-9]+$/;
    const zipReg = /^\d{5}$/;
    const alphaReg = /^[A-Za-z]+$/;
    if (
      [
        "RowQuestion1",
        "RowQuestion2",
        "AddressStreet",
        "AddressUnit",
        "AddressCity",
      ].includes(name) &&
      aplhaNumericReg.test(value)
    ) {
      name === "RowQuestion1"
        ? setError({ ...error, rowQ1: false })
        : name === "RowQuestion2"
        ? setError({ ...error, rowQ2: false })
        : name === "AddressStreet"
        ? setError({ ...error, street: false })
        : name === "AddressUnit"
        ? setError({ ...error, unit: false })
        : setError({ ...error, city: false });
    } else if (name === "GroupText" && phonePattern.test(value)) {
      setError({ ...error, rowPhone: false });
    } else if (name === "AddressZip" && zipReg.test(value)) {
      setError({ ...error, zip: false });
    } else if (name === "Suffix" && alphaReg.test(value)) {
      setError({ ...error, suffix: false });
    } else {
      return name === "RowQuestion1"
        ? setError({ ...error, rowQ1: true })
        : name === "RowQuestion2"
        ? setError({ ...error, rowQ2: true })
        : name === "GroupText"
        ? setError({ ...error, rowPhone: true })
        : name === "AddressStreet"
        ? setError({ ...error, street: true })
        : name === "AddressUnit"
        ? setError({ ...error, unit: true })
        : name === "AddressZip"
        ? setError({ ...error, zip: true })
        : name === "Suffix"
        ? setError({ ...error, suffix: true })
        : name === "AddressCity"
        ? setError({ ...error, city: true })
        : setError({
            ...error,
            rowQ1: false,
            rowQ2: false,
            street: false,
            unit: false,
            city: false,
            zip: false,
            rowPhone: false,
          });
    }
  };

  const checkError = () => {
    return error.rowQ1 ||
      error.rowQ2 ||
      error.rowPhone ||
      error.street ||
      error.unit ||
      error.city ||
      error.zip ||
      error.suffix
      ? true
      : isVal;
  };

  const handleSave = (parent, data) => {
    if (parent.data.label !== "") {
      let tempData = data.find((f) => f.data.label === "");
      if (tempData || !parent.data.label) {
        fromChild();
      } else {
        let margin = 0;
        if (count.value !== 0) margin = data[0].position.y * count.value;
        const parentId = nodes.findIndex((node) => node.id === parent.id);
        data.forEach((ele) => {
          const id = nodes.findIndex((node) => node.id === ele.id);
          if (!(data.length > parent?.options?.length)) {
            nodes.splice(id, 1);
          }
          nodes.push(ele);
        });

        if (data.length > parent?.options?.length) {
          parent.style.height = parent.style.height + margin;
          // parent.options.push(data.pop().data);
          parent.options = data.map((d) => d.data);
        }

        if (
          parent.data.type === "group" ||
          parent.data.type === "contactInfoFields"
        ) {
          parent.style.height = parent.style.height + margin;
        }

        if (parent.options)
          data.forEach((n) => {
            const foundtemp = parent.options.find(
              (f) => f.value === n.data.value
            );
            foundtemp && (foundtemp.label = n.data.label);
          });

        nodes[parentId] = parent;

        const mainNodes = nodes.findIndex((m) => m.id === parent.parentNode);
        mainNodes !== -1 && (nodes[mainNodes].style.height += margin);

        data[0].type === "pickerFields" || data[0].type === "rangeFields"
          ? fromChild(nodes, true)
          : fromChild(nodes, false);
      }
    }
  };

  useEffect(() => setField(action), [action]);

  return (
    <Fragment>
      {action[0]?.type === "rangeFields" ? (
        <RangeFieldsComp action={action[0]} />
      ) : action[0]?.type === "pickerFields" ? (
        <PickerFieldsComp action={action[0]} handleChange={handleChange} />
      ) : action[0]?.type === "contactInfoFields" ? (
        <ContactInfoFieldsComp
          action={action[0]}
          error={error}
          handleChange={handleChange}
        />
      ) : action[0]?.type === "groupFields" ? (
        <GroupFieldsComp
          action={action[0]}
          error={error}
          handleChange={handleChange}
        />
      ) : action[0]?.type === "photoFields" ? (
        <PhotoFieldComp image={image} handleChange={handleChange} />
      ) : action[0]?.type === "addressInfoFields" ? (
        <AddressInfoFields
          action={action[0]}
          error={error}
          handleChange={handleChange}
          pickerChange={pickerChange}
        />
      ) : (
        action[0]?.type !== "upload" &&
        action?.map((item, i) => (
          <TextField
            key={i}
            size="small"
            className="rounded"
            sx={{ mx: 2, mb: 1, backgroundColor: "#f8f9fa" }}
            value={item.data.label}
            name={item?.data?.value?.toString()}
            onChange={(e) => handleChange(e, "")}
          />
        ))
      )}

      {/* Save and Cancel Action Buttons */}
      <Actions
        handleSave={handleSave}
        isVal={checkError()}
        fromChild={fromChild}
        parentFrame={parentFrame}
        action={action}
      />
    </Fragment>
  );
};

export default NodeTypes;

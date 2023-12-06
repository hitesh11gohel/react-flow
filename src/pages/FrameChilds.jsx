import { v4 as uuidv4 } from "uuid";
import {
  Info,
  CheckCircle,
  Flaky,
  PresentToAll,
  AttachMoney,
  Photo,
  Group,
  ContactPage,
  Grading,
  TextFormat,
  ArrowDropDownCircle,
  Email,
  Cake,
  Place,
  LocationSearching,
  CurrencyRupee,
  Public,
  Foundation,
  AdminPanelSettings,
  LinearScale,
  Phone,
} from "@mui/icons-material";
const style = {
  height: 225,
  width: 600,
  border: "1px solid red",
  backgroundColor: "white",
  zIndex: -2,
  backgroundImage:
    "radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% )",
};

const overFlowStyle = {
  overflow: "hidden",
  display: "inline-block",
  textDecoration: " none",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const optionNodeStyle = {
  ...overFlowStyle,
  width: "150px",
  border: "1px solid #898383",
  borderRadius: "5px",
  backgroundColor: "white",
};

const addFrame = (fId, Icon, Name, position, frame) => {
  let merged = [];
  let allNodes = [];

  frame.forEach((node, i) => {
    if (node.type === "picker") {
      const newId = `${node.qId}-${uuidv4()}`;
      merged.push(
        ...[
          {
            ...node,
            draggableId: node.draggableId,
            id: newId,
            type: "output",
            parentNode: fId,
            extent: "parent",
            position: { x: 75, y: 275 * i },
            className: "outer-group",
            style: {
              ...overFlowStyle,
              width: 600,
              height: 225,
              padding: "25px",
              border: "1px solid red",
              backgroundColor: "white",
              backgroundImage:
                "radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% )",
            },
          },
          {
            ...node,
            draggableId: `picker-${uuidv4()}`,
            style: {},
            id: `picker-${uuidv4()}`,
            sourcePosition: "right",
            type: "pickerFields",
            data: {
              value: node.options[0].value,
              selectedLabel: node.options[0].label,
              options: node.options,
              isConnectable: true,
            },
            position: { x: 25, y: 75 },
            parentNode: newId,
            extent: "parent",
          },
        ]
      );
    } else if (node.type === "range") {
      const newId = `${node.qId}-${uuidv4()}`;
      merged.push(
        ...[
          {
            ...node,
            draggableId: node.draggableId,
            id: newId,
            type: "output",
            parentNode: fId,
            extent: "parent",
            position: { x: 75, y: 275 * i },
            className: "outer-group",
            style: {
              ...overFlowStyle,
              width: 600,
              height: 225,
              padding: "25px",
              border: "1px solid red",
              backgroundColor: "white",
              backgroundImage:
                "radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% )",
            },
          },
          {
            ...node,
            draggableId: `range-${uuidv4()}`,
            style: {},
            id: `range-${uuidv4()}`,
            sourcePosition: "right",
            type: "rangeFields",
            draggable: false,
            data: {
              value: node.initial,
              step: node.step,
              min: node.min,
              max: node.max,
            },
            position: { x: 50, y: 75 },
            parentNode: newId,
            extent: "parent",
          },
        ]
      );
    } else {
      allNodes.push({
        ...node,
        data: { ...node.data, createdAt: new Date().toISOString() },
        id: `${node.qId}-${uuidv4()}`,
        type: node.type ?? "Frame",
        parentNode: fId,
        style: {
          ...node.style,
          backgroundColor: "white",
          // backgroundImage:
          //   "linear-gradient( 359.3deg,  rgba(196,214,252,1) 1%, rgba(187,187,187,0) 70.9% )",
          backgroundImage:
            "radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% )",
        },
        extent: "parent",
        className: "outer-group",
        position: { x: 75, y: i === 0 ? 50 : 275 * i },
      });
    }
  });

  allNodes
    .filter((node) => node.options)
    .map((m) => ({
      id: m.id,
      style: m.style,
      options: m.options.map((o) => ({
        draggableId: `${o.value}-${uuidv4()}`,
        id: `${o.value}-${uuidv4()}`,
        sourcePosition: "right",
        parentNode: m.id,
        type: "input",
        data: {
          label: o.label,
          value: o.value,
          target: o.target ?? "",
        },
        target: o.target,
      })),
    }))
    .forEach((node) => {
      const count = node.options.length;
      merged.push(
        ...node.options.map((ele, index) => ({
          ...ele,
          extent: "parent",
          style: {
            ...ele.style,
            overflow: "hidden",
            display: "inline-block",
            textDecoration: " none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: "1px solid #898383",
            borderRadius: "5px",
            backgroundColor: "white",
          },
          position: { x: 225, y: (count > 2 ? 50 : 75) * (index + 1) },
        }))
      );
    });
  return [
    {
      draggableId: `frame-${fId}`,
      id: fId,
      type: "Frame",
      data: { icon: Icon, label: Name, isConnectable: true, isFrame: true },
      position: position,
      className: "outer-group",
      style: {
        border: "1px solid red",
        height: 2750,
        width: 750,
        zIndex: -2,
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
        boxShadow:
          "0px 8px 9px -5px rgba(0,0,0,0.2), 0px 15px 22px 2px rgba(0,0,0,0.14), 0px 6px 28px 5px rgba(0,0,0,0.12)",
      },
    },
    ...[...allNodes, ...merged],
  ];
};

const boolNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        icon: <Flaky />,
        type: "boolean",
        isConnectable: true,
        label: "Are you working with a Loan Officer?",
      },
      id: pId,
      style: { ...style, ...overFlowStyle },
      type: "Frame",
      extent: "parent",
      className: "outer-group",
      position: { x: position.x, y: position.y },
      options: [
        { label: "Yes", value: "Yes", target: "blank" },
        { label: "No", value: "No" },
      ],
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      id: `bool-yes-${uuidv4()}`,
      position: { x: 225, y: 75 },
      data: { label: "Yes", value: "Yes", target: "blank" },
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      id: `bool-no-${uuidv4()}`,
      position: { x: 225, y: 150 },
      data: { label: "No", value: "No" },
    },
  ];
};

const choiceNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        type: "choice",
        isConnectable: true,
        label: "How will you use this property?",
        icon: <CheckCircle />,
      },
      id: pId,
      type: "Frame",
      placeholder: "",
      name: "choice-group",
      fieldId: "choice-group",
      qId: "choice-group-" + uuidv4(),
      style: { ...style, height: 200 },
      options: [
        { label: "Option 1", value: "Option1" },
        { label: "Option 2", value: "Option2" },
        { label: "Option 3", value: "Option3", target: "blank" },
      ],
      width: 600,
      height: 200,
      extent: "parent",
      losFieldId: "1811",
      className: "outer-group",
      target: "IsMilitaryService",
      sourcePosition: "left right",
      position: { x: position.x, y: position.y },
      question: "How will you use this property?",
    },
    {
      target: "",
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      position: { x: 225, y: 50 },
      id: `choice-opt1-${uuidv4()}`,
      draggableId: `choice-opt1-${uuidv4()}`,
      data: { label: "Option 1", value: "Option 1" },
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      position: { x: 225, y: 100 },
      id: `choice-opt2-${uuidv4()}`,
      draggableId: `choice-opt2-${uuidv4()}`,
      data: { label: "Option 2", value: "Option2" },
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      position: { x: 225, y: 150 },
      id: `choice-opt3-${uuidv4()}`,
      draggableId: `choice-opt3-${uuidv4()}`,
      data: { label: "Option 3", value: "Option3", target: "blank" },
    },
  ];
};

const newSubNode = (id) => {
  return [
    {
      type: "input",
      draggableId: `node-${uuidv4()}`,
      id: `node-${uuidv4()}`,
      sourcePosition: "right",
      position: { x: 25, y: 30 },
      parentNode: id,
      extent: "parent",
      data: { label: "", value: "", target: "" },
    },
  ];
};

const textNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      data: {
        value: "",
        type: "textFields",
        isConnectable: true,
        label: "Enter down payment amount",
        icon: <TextFormat />,
      },
      id: pId,
      qId: pId,
      parentNode: fId,
      selected: false,
      dragging: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter amount",
      position: { x: position.x, y: position.y },
      style: { ...style, padding: "1rem" },
    },
  ];
};

const emailNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        value: "jacob@gmail.com",
        type: "textFields",
        validation: "email",
        isConnectable: true,
        label: "What is your email?",
        icon: <Email />,
      },
      id: pId,
      qId: pId,
      selected: false,
      dragging: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter Email",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const dobNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      data: {
        value: "01/01/2000",
        validation: "dob",
        type: "textFields",
        isConnectable: true,
        label: "Date of Birth",
        icon: <Cake />,
      },
      id: pId,
      qId: pId,
      dragging: false,
      selected: false,
      extent: "parent",
      type: "textFields",
      parentNode: fId,
      className: "outer-group",
      placeholder: "Enter Date of Birth",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const phoneNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        value: "9856457782",
        type: "textFields",
        validation: "phone",
        isConnectable: true,
        label: "What is your contact number?",
        icon: <Phone />,
      },
      id: pId,
      qId: pId,
      dragging: false,
      selected: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter contact number",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const addressNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        value: "",
        type: "textFields",
        isConnectable: true,
        label: "What is your address?",
        icon: <Place />,
      },
      id: pId,
      qId: pId,
      selected: false,
      dragging: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter Address",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const addressGroupNodes = (fId, pId, position) => {
  return [
    {
      id: pId,
      parentNode: fId,
      extent: "parent",
      type: "customeInput",
      data: {
        icon: <LocationSearching />,
        isConnectable: true,
        type: "addressgroup",
        label: "Please enter the address of the ...",
      },
      qId: pId,
      className: "outer-group",
      position: { x: position.x, y: position.y },
      style: { ...style, ...overFlowStyle, padding: 25, height: 500 },
    },
    {
      id: `contact-group-child-${uuidv4()}`,
      sourcePosition: "right",
      type: "addressInfoFields",
      data: {
        placeholder: "",
        type: "group",
        items: [
          {
            label: "",
            type: "text ",
            losFieldId: "",
            optional: true,
            qId: "AddressLookup",
            name: "AddressLookup",
            fieldId: "AddressLookup",
            question: "Address Lookup",
            placeholder: "Please enter place",
          },
          {
            label: "",
            type: "text",
            losFieldId: "",
            qId: "AddressStreet",
            name: "AddressStreet",
            fieldId: "AddressStreet",
            validation: "alphanumeric",
            question: "Street Address",
            placeholder: "Please enter street address",
          },
          {
            type: "picker",
            default: "Unit Type",
            question: "Unit Type",
            options: [
              {
                label: "Apartment",
                value: "Apartment",
              },
              {
                label: "Basement",
                value: "Basement",
              },
              {
                label: "Building",
                value: "Building",
              },
              {
                label: "Condo",
                value: "Condo",
              },
              {
                label: "Department",
                value: "Department",
              },
              {
                label: "Floor",
                value: "Floor",
              },
              {
                label: "Front",
                value: "Front",
              },
              {
                label: "Hangar",
                value: "Hangar",
              },
              {
                label: "Key",
                value: "Key",
              },
              {
                label: "Lobby",
                value: "Lobby",
              },
              {
                label: "Lot",
                value: "Lot",
              },
              {
                label: "Lower",
                value: "Lower",
              },
              {
                label: "Office",
                value: "Office",
              },
              {
                label: "Penthouse",
                value: "Penthouse",
              },
              {
                label: "Pier",
                value: "Pier",
              },
              {
                label: "Rear",
                value: "Rear",
              },
              {
                label: "Room",
                value: "Room",
              },
              {
                label: "Side",
                value: "Side",
              },
              {
                label: "Space",
                value: "Space",
              },
              {
                label: "Stop",
                value: "Stop",
              },
              {
                label: "Suite",
                value: "Suite",
              },
              {
                label: "Trailer",
                value: "Trailer",
              },
              {
                label: "Unit",
                value: "Unit",
              },
              {
                label: "Upper",
                value: "Upper",
              },
            ],
            label: "",
            optional: true,
            losFieldId: "",
            value: "Apartment",
            qId: "AddressUnitType",
            name: "AddressUnitType",
            fieldId: "AddressUnitType",
          },
          {
            label: "",
            type: "text",
            optional: true,
            losFieldId: "",
            name: "AddressUnit",
            qId: "AddressUnitType",
            fieldId: "AddressUnit",
            question: "Unit / Apt #",
            validation: "alphanumeric",
            placeholder: "Please enter address unit",
          },
          {
            label: "",
            type: "text",
            losFieldId: "",
            question: "City",
            qId: "AddressCity",
            name: "AddressCity",
            validation: "alpha",
            fieldId: "AddressCity",
            placeholder: "Please enter city",
          },
          {
            type: "picker",
            default: "State",
            question: "State",
            options: [
              { label: "state 1", value: "state 1" },
              { label: "state 2", value: "state 2" },
              { label: "state 3", value: "state 3" },
              { label: "state 4", value: "state 4" },
              { label: "state 5", value: "state 5" },
            ],
            label: "",
            losFieldId: "",
            model: "states",
            value: "state 1",
            qId: "AddressState",
            name: "AddressState",
            licensesFilter: false,
            fieldId: "AddressState",
          },
          {
            label: "",
            type: "text",
            maxlength: 5,
            losFieldId: "",
            question: "Zip",
            qId: "AddressZip",
            name: "AddressZip",
            fieldId: "AddressZip",
            validation: "zipcode",
            keyboardType: "number-pad",
            placeholder: "Please enter zip",
          },
        ],
      },
      parentNode: pId,
      extent: "parent",
      draggable: false,
      position: { x: 25, y: 60 },
    },
  ];
};

const pickerNodes = (fId, pId, position) => {
  const pickerOptions = [
    { label: "0%", value: 0 },
    { label: "3%", value: 3 },
    { label: "3.5%", value: 3.5 },
    { label: "5%", value: 5 },
    { label: "10%", value: 10 },
    { label: "15%", value: 15 },
    { label: "20%", value: 20 },
    { label: "Other", value: "Other" },
  ];
  return [
    {
      type: "customeInput",
      draggableId: pId,
      parentNode: fId,
      data: {
        type: "picker",
        icon: <ArrowDropDownCircle />,
        label: "HOW MUCH DO YOU PLAN TO PUT DOWN?",
        isConnectable: true,
      },
      id: pId,
      qId: pId,
      extent: "parent",
      options: pickerOptions,
      sourcePosition: "right",
      targetPosition: "left",
      className: "outer-group",
      style: { ...style, padding: 25, ...overFlowStyle },
      position: { x: position.x, y: position.y },
    },
    {
      width: 525,
      height: 80,
      parentNode: pId,
      extent: "parent",
      type: "pickerFields",
      sourcePosition: "right",
      id: `picker-${uuidv4()}`,
      position: { x: 25, y: 75 },
      draggableId: `picker-${uuidv4()}`,
      data: { value: 0, selectedLabel: "0%", options: pickerOptions },
    },
  ];
};

const rangeNodes = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        icon: <LinearScale />,
        type: "range",
        min: 50000,
        step: 25000,
        max: 2500000,
        value: 200000,
        isConnectable: true,
        label: "WHAT IS THE ESTIMATED PRICE OF YOUR NEW HOME?",
      },
      id: pId,
      qId: pId,
      extent: "parent",
      type: "customeInput",
      className: "outer-group",
      position: { x: position.x, y: position.y },
      style: { ...style, ...overFlowStyle, padding: 25 },
    },
    {
      draggable: false,
      type: "rangeFields",
      sourcePosition: "right",
      id: `range-${uuidv4()}`,
      data: {
        min: 50000,
        step: 25000,
        max: 2500000,
        value: 200000,
      },
      qId: pId,
      parentNode: pId,
      extent: "parent",
      position: { x: 25, y: 75 },
    },
  ];
};

const groupNodes = (fId, pId, position) => {
  return [
    {
      id: pId,
      parentNode: fId,
      extent: "parent",
      type: "customeInput",
      title: "New Group Title",
      heading: "New Group Heading",
      data: {
        icon: <Group />,
        value: "",
        type: "group",
        isConnectable: true,
        label: "CONTACT INFORMATION",
      },
      qId: pId,
      className: "outer-group",
      position: { x: position.x, y: position.y },
      style: { ...style, ...overFlowStyle, padding: 25, height: 280 },
    },
    {
      type: "groupFields",
      sourcePosition: "right",
      id: `contact-group-child-${uuidv4()}`,
      data: {
        placeholder: "",
        type: "group",
        items: [
          {
            qId: pId,
            value: "",
            label: "",
            type: "text",
            losFieldId: "",
            name: "GroupText",
            fieldId: "GroupText",
            keyboardType: "number-pad",
            question: "What is your question?",
            placeholder: "Enter contact number",
          },
          {
            type: "row",
            items: [
              {
                qId: pId,
                value: "",
                label: "",
                width: 200,
                type: "text",
                optional: true,
                losFieldId: "",
                style: { flex: 1 },
                name: "RowQuestion1",
                fieldId: "RowQuestion1",
                question: "Row Question 1",
                validation: "alphanumeric",
                placeholder: "Row Question 1",
              },
              {
                qId: pId,
                value: "",
                label: "",
                width: 200,
                type: "text",
                optional: true,
                losFieldId: "",
                style: { flex: 1 },
                name: "RowQuestion2",
                fieldId: "RowQuestion2",
                question: "Row Question 2",
                validation: "alphanumeric",
                placeholder: "Row Question 2",
              },
            ],
          },
        ],
      },
      parentNode: pId,
      extent: "parent",
      draggable: false,
      position: { x: 25, y: 60 },
    },
  ];
};

const contactInfo = (fId, pId, position) => {
  return [
    {
      id: pId,
      parentNode: fId,
      extent: "parent",
      type: "customeInput",
      data: {
        icon: <ContactPage />,
        value: "",
        isConnectable: true,
        type: "contactInfoFields",
        label: "Contact Information",
      },
      qId: pId,
      className: "outer-group",
      position: { x: position.x, y: position.y },
      style: { ...style, ...overFlowStyle, padding: 25, height: 350 },
    },
    {
      sourcePosition: "right",
      type: "contactInfoFields",
      id: `contact-group-child-${uuidv4()}`,
      data: {
        placeholder: "",
        type: "contact-info-group",
        items: [
          {
            label: "",
            value: "",
            type: "text",
            losFieldId: "",
            qId: "FirstName",
            name: "First Name",
            fieldId: "FirstName",
            question: "First Name",
            placeholder: "Enter First Name",
          },
          {
            label: "",
            value: "",
            type: "text",
            losFieldId: "",
            qId: "LastName",
            name: "Last Name",
            question: "Last Name",
            fieldId: "BorrowerLastName",
            placeholder: "Enter Last Name",
          },
          {
            value: "",
            label: "",
            type: "text",
            maxLength: 1,
            losFieldId: "",
            optional: true,
            validation: "alpha",
            qId: "MiddleInitial",
            name: "Middle Initial",
            fieldId: "MiddleInitial",
            placeholder: "Enter Middle Initial",
            question: "Middle Initial (optional)",
          },
          {
            value: "",
            label: "",
            type: "text",
            qId: "Suffix",
            losFieldId: "",
            name: "Suffix",
            optional: true,
            fieldId: "Suffix",
            validation: "alpha",
            placeholder: "Enter Suffix",
            question: "Suffix (optional)",
          },
        ],
      },
      parentNode: pId,
      extent: "parent",
      draggable: false,
      position: { x: 25, y: 60 },
    },
  ];
};

const declarationNode = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        icon: <Grading />,
        type: "boolean",
        isConnectable: true,
        label: "Will you do something?",
      },
      id: pId,
      style: style,
      type: "Frame",
      extent: "parent",
      className: "outer-group",
      position: { x: position.x, y: position.y },
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      position: { x: 225, y: 75 },
      id: `declaration-yes-${uuidv4()}`,
      data: { label: "Yes", value: "Yes", target: "blank" },
    },
    {
      type: "input",
      parentNode: pId,
      extent: "parent",
      style: optionNodeStyle,
      sourcePosition: "right",
      position: { x: 225, y: 150 },
      id: `declaration-no-${uuidv4()}`,
      data: { label: "No", value: "No" },
    },
  ];
};

const informationNode = (fId, pId, position) => {
  return [
    {
      type: "input",
      parentNode: fId,
      draggableId: pId,
      data: {
        icon: <Info />,
        type: "input",
        createdAt: "2023-04-17T13:58:29.536Z",
        label:
          "This is an application to be pre-approved for a mortgage loan. In this application you'll be asked a series of questions that will tailor your experience to your specific loan scenario. When finished, you'll be taken to our interactive member portal where you can upload and sign supporting documents, communicate with your loan officer and provide us with any additional information that is required to complete your application.",
      },
      logo: true,
      style: { ...style, overflow: "auto", paddingTop: "1rem", height: 165 },
      title: "Prequalify for a Mortgage",
      heading: "Welcome to {{CompanyName}}",
      question:
        "This is an application to be pre-approved for a mortgage loan. In this application you'll be asked a series of questions that will tailor your experience to your specific loan scenario. When finished, you'll be taken to our interactive member portal where you can upload and sign supporting documents, communicate with your loan officer and provide us with any additional information that is required to complete your application.",
      id: pId,
      extent: "parent",
      specialType: "info",
      buttonText: "Let's Go",
      targetPosition: "left",
      sourcePosition: "right",
      qId: "WelcomeStatement",
      className: "outer-group",
      target: "IsWorkingWithLO",
      name: "Welcome Statement",
      fieldId: "WelcomeStatement",
      position: { x: position.x, y: position.y },
    },
  ];
};

const currencyNode = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        value: "",
        type: "textFields",
        isConnectable: true,
        label: "What is your currency question?",
        icon: <CurrencyRupee />,
      },
      id: pId,
      qId: pId,
      width: 600,
      height: 225,
      selected: false,
      dragging: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter amount",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const ssnNode = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        value: "",
        type: "textFields",
        isConnectable: true,
        placeholder: "Enter SSN",
        label: "What is your SSN?",
        icon: <AttachMoney />,
      },
      id: pId,
      qId: pId,
      height: 225,
      width: 600,
      selected: false,
      dragging: false,
      extent: "parent",
      type: "textFields",
      className: "outer-group",
      placeholder: "Enter amount",
      style: { ...style, padding: "1rem" },
      position: { x: position.x, y: position.y },
    },
  ];
};

const pickerState = (fId, pId, position) => {
  const pickerOptions = [
    { label: "California", value: "California" },
    { label: "New York", value: "New York" },
    { label: "Texas", value: "Texas" },
    { label: "Arizona", value: "Arizona" },
    { label: "Washington", value: "Washington" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "Other", value: "Other" },
  ];
  return [
    {
      draggableId: pId,
      parentNode: fId,
      type: "customeInput",
      data: {
        type: "picker",
        isConnectable: true,
        placeholder: "Enter State",
        label: "WHERE ARE YOU LOCATED?",
        icon: <Public />,
      },
      id: pId,
      qId: pId,
      extent: "parent",
      options: pickerOptions,
      className: "outer-group",
      style: { ...style, padding: 25 },
      position: { x: position.x, y: position.y },
    },
    {
      height: 80,
      width: 525,
      type: "pickerFields",
      draggableId: `picker-${uuidv4()}`,
      data: {
        value: "California",
        options: pickerOptions,
        selectedLabel: "California",
      },
      parentNode: pId,
      extent: "parent",
      sourcePosition: "right",
      id: `picker-${uuidv4()}`,
      position: { x: 25, y: 75 },
    },
  ];
};

const pickerStateLicenced = (fId, pId, position) => {
  const pickerOptions = [
    { label: "California", value: "California" },
    { label: "New York", value: "New York" },
    { label: "Texas", value: "Texas" },
    { label: "Arizona", value: "Arizona" },
    { label: "Washington", value: "Washington" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "Other", value: "Other" },
  ];
  return [
    {
      type: "customeInput",
      parentNode: fId,
      draggableId: pId,
      data: {
        type: "picker",
        isConnectable: true,
        label: "WHERE ARE YOU LOCATED?",
        placeholder: "Enter Licensed State",
        icon: <Foundation />,
      },
      id: pId,
      qId: pId,
      extent: "parent",
      options: pickerOptions,
      className: "outer-group",
      style: { ...style, padding: 25 },
      position: { x: position.x, y: position.y },
    },
    {
      width: 525,
      height: 80,
      type: "pickerFields",
      draggableId: `picker-${uuidv4()}`,
      data: {
        value: "California",
        options: pickerOptions,
        selectedLabel: "California",
      },
      parentNode: pId,
      extent: "parent",
      sourcePosition: "right",
      id: `picker-${uuidv4()}`,
      position: { x: 25, y: 75 },
    },
  ];
};

const authNodes = (fId, pId, position, uId) => {
  return [
    {
      id: pId,
      qId: pId,
      parentNode: fId,
      type: "customeInput",
      extent: "parent",
      data: {
        icon: <AdminPanelSettings />,
        value: true,
        type: "auth",
        isConnectable: true,
        label: "AUTHORIZATION",
      },
      className: "outer-group",
      style: { ...style, ...overFlowStyle, height: 150, padding: 25 },
      position: { x: position.x, y: position.y },
    },
    {
      parentNode: pId,
      extent: "parent",
      draggable: false,
      type: "authFields",
      sourcePosition: "right",
      position: { x: 170, y: 70 },
      id: `${uId}-auth-child-${uuidv4()}`,
      data: { label: "I consent to do something", value: true },
      style: {
        width: "250px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textDecoration: " none",
        textOverflow: "ellipsis",
        display: "inline-block",
      },
    },
  ];
};

const photoNode = (fId, pId, position) => {
  return [
    {
      draggableId: pId,
      parentNode: fId,
      data: {
        type: "photoFields",
        icon: <Photo />,
        value:
          "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
        isConnectable: true,
        label: "CHOOSE IMAGE",
      },
      id: pId,
      type: "customeInput",
      placeholder: "Choose Image",
      style: {
        ...style,
        ...overFlowStyle,
        padding: "25px",
        justifyContent: "center",
      },
      qId: pId,
      width: 600,
      height: 225,
      selected: false,
      dragging: false,
      extent: "parent",
      className: "outer-group",
      position: { x: position.x, y: position.y },
    },
    {
      height: 80,
      width: 525,
      type: "photoFields",
      draggableId: `photo-${uuidv4()}`,
      data: {
        label: "pic",
        type: "photoFields",
        value:
          "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
      },
      parentNode: pId,
      extent: "parent",
      id: `photo-${uuidv4()}`,
      sourcePosition: "right",
      position: { x: 230, y: 20 },
      style: { display: "flex", justifyContent: "center" },
    },
  ];
};

const uploadNodes = (fId, pId, position) => {
  return [
    {
      id: pId,
      draggableId: pId,
      parentNode: fId,
      title: "New Upload Title",
      heading: "New Upload Heading",
      data: {
        value: "",
        type: "upload",
        isConnectable: true,
        icon: <PresentToAll />,
        label: "UPLOAD IMAGE",
      },
      qId: pId,
      target: "",
      width: 600,
      height: 350,
      question: "",
      losFieldId: "",
      type: "customeInput",
      selected: false,
      dragging: false,
      extent: "parent",
      fieldId: "upload",
      name: "NewUpload",
      className: "outer-group",
      placeholder: "Upload image",
      position: { x: position.x, y: position.y },
      style: { ...style, ...overFlowStyle, padding: "25px", height: 350 },
    },
    {
      width: 525,
      height: 80,
      data: {
        value: "",
        test: "test",
        label: "Photo",
        isConnectable: true,
        type: "uploadFields",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk6-ykLbIGhmwNorCkT7LiloxZZFV3eiGcMw&usqp=CAU",
      },
      type: "upload",
      parentNode: pId,
      extent: "parent",
      sourcePosition: "right",
      id: `upload-${uuidv4()}`,
      position: { x: 25, y: 75 },
      draggableId: `photo-${uuidv4()}`,
    },
  ];
};

const newGroup = (fId, pId, position) => {
  return [
    {
      type: "customeInput",
      draggableId: pId,
      data: {
        type: "newGroup",
        icon: <Group />,
        label: "All Information",
        isConnectable: true,
      },
      id: pId,
      qId: pId,
      extent: "parent",
      sourcePosition: "right",
      targetPosition: "left",
      className: "outer-group",
      style: { ...style, padding: 25, height: 100, width: 700 },
      position: { x: position.x, y: position.y },
    },
  ];
};

export {
  ssnNode,
  addFrame,
  dobNodes,
  newGroup,
  authNodes,
  photoNode,
  boolNodes,
  textNodes,
  newSubNode,
  groupNodes,
  rangeNodes,
  emailNodes,
  phoneNodes,
  pickerState,
  uploadNodes,
  choiceNodes,
  pickerNodes,
  contactInfo,
  addressNodes,
  currencyNode,
  informationNode,
  declarationNode,
  addressGroupNodes,
  pickerStateLicenced,
};

import React from "react";
import { FloatButton } from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  DownOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
const ApplicationFormOptions = ({ setFormData, formData }) => {
  return (
    <FloatButton.Group
      trigger="click"
      style={{
        right: 0,
        bottom: 0,
      }}
      className="position-absolute"
      icon={<PlusOutlined />}
      type="primary"
    >
      <FloatButton
        onClick={() => {
          setFormData([
            ...formData,
            {
              name: "Text Field",
              type: "text",
              label: "Label",
              required: false,
            },
          ]);
        }}
        tooltip="Text Input"
        description="ABC"
      />
      <FloatButton
        onClick={() => {
          setFormData([
            ...formData,
            {
              name: "Number Field",
              type: "number",
              label: "Label",
              required: false,
            },
          ]);
        }}
        tooltip="Number Input"
        description="123"
      />
      <FloatButton
        onClick={() => {
          setFormData([
            ...formData,
            {
              name: "Checkbox",
              type: "checkbox",
              label: "Label",
              options: [{ label: "" }],
              required: false,
            },
          ]);
        }}
        tooltip="Checkbox"
        icon={<CheckOutlined />}
      />
      <FloatButton
        onClick={() => {
          setFormData([
            ...formData,
            {
              name: "Radio",
              type: "radio",
              label: "Label",
              options: [{ label: "", value: "", selected: false }],
              required: false,
            },
          ]);
        }}
        tooltip="Radio"
        icon={<CheckSquareOutlined />}
      />
      <FloatButton
        onClick={() => {
          setFormData([
            ...formData,
            {
              name: "select",
              type: "select",
              label: "Label",
              options: [{ label: "", value: "", selected: false }],
              required: false,
            },
          ]);
        }}
        tooltip="Dropdown"
        icon={<DownOutlined />}
      />
    </FloatButton.Group>
  );
};

export default ApplicationFormOptions;

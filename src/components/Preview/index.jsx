import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import React from "react";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
const Preview = ({
  formData,
  handleInput,
  handleLabel,
  addBox,
  handleInputBox,
  handleSelectedCheckBox,
  handleSelectedRadio,
  handleDelete,
  handleRequired,
  handleDeleteOption,
}) => {
  return (
    <div className="">
      {formData?.map((each, index) => (
        <div className="th-form-card mb-3" key={index + each}>
          <div className="">
            <Input
              name={each?.name}
              placeholder="Label"
              type="text"
              value={each?.label}
              onChange={(e) => handleLabel(e, index)}
            />
            {["number", "text"]?.includes(each?.type) &&
              (each?.type == "number" ? (
                <InputNumber
                  readOnly
                  name={each?.name}
                  placeholder={`Enter Field ${each?.type}`}
                  onChange={(e) => handleInput(e, index)}
                  size="large"
                  className="mt-2 th-border-bottom w-100"
                />
              ) : (
                <Input
                  readOnly
                  name={each?.name}
                  type={each?.type}
                  placeholder={`Enter Field ${each?.type}`}
                  onChange={(e) => handleInput(e, index)}
                  size="large"
                  className="mt-2 th-border-bottom"
                />
              ))}
            {["checkbox", "radio"]?.includes(each?.type) && (
              <div className="mt-2">
                {each?.options?.map((item, ind) => (
                  <div key={ind + index}>
                    <Space>
                      {each?.type == "checkbox" && (
                        <Checkbox
                          checked={item?.checked}
                          onChange={(e) =>
                            handleSelectedCheckBox(e, index, ind)
                          }
                          disabled
                        />
                      )}
                      {each?.type == "radio" && (
                        <Radio
                          disabled
                          checked={item?.selected}
                          value={item?.label}
                          name={item?.name}
                          onChange={(e) => handleSelectedRadio(e, index, ind)}
                        />
                      )}
                      <Input
                        name={item?.name}
                        type={"text"}
                        placeholder="Enter Field Value"
                        value={item?.label}
                        onChange={(e) => handleInputBox(e, index, ind)}
                        size="medium"
                        className="w-100 m-1"
                      />
                      {each?.options?.length > 1 && (
                        <CloseOutlined
                          key={ind + index}
                          className="mx-2 th-pointer"
                          onClick={() => handleDeleteOption(index, ind)}
                        />
                      )}
                    </Space>
                    {each?.options?.length - 1 == ind &&
                      each?.type !== "checkbox" && (
                        <Space className="w-100">
                          {each?.type == "checkbox" && (
                            <Checkbox
                              checked={item?.checked}
                              onChange={(e) =>
                                handleSelectedCheckBox(e, index, ind)
                              }
                              disabled
                            />
                          )}
                          {each?.type == "radio" && (
                            <Radio
                              disabled
                              checked={item?.selected}
                              value={item?.label}
                              name={item?.name}
                              onChange={(e) =>
                                handleSelectedRadio(e, index, ind)
                              }
                            />
                          )}
                          <div
                            className="mt-1 th-pointer"
                            onClick={() => {
                              each?.type == "checkbox"
                                ? addBox(index, "checkbox")
                                : addBox(index, "radio");
                            }}
                          >
                            Add Choice +
                          </div>
                        </Space>
                      )}
                  </div>
                ))}
              </div>
            )}
            {each?.type == "select" && (
              <>
                {each?.options?.map((item, ind) => (
                  <div className="d-flex align-items-center">
                    <Input
                      name={item?.name}
                      type={"text"}
                      value={item?.label}
                      placeholder={"Enter Option " + (ind + 1)}
                      onChange={(e) => handleInputBox(e, index, ind, "select")}
                      size="medium"
                      className="w-100 m-1"
                    />
                    {ind === each?.options?.length - 1 && (
                      <div className="d-flex w-100 justify-content-end">
                        <div
                          className="rounded border p-1"
                          onClick={() => {
                            addBox(index, "select");
                          }}
                        >
                          Add Choice +
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <Row className="mt-3" justify={"end"}>
            <Space>
              <Tooltip title="Delete Item">
                <Tag
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="th-pointer"
                  icon={<DeleteOutlined />}
                  color="error"
                >
                  Delete
                </Tag>
              </Tooltip>
              <Switch
                size="medium"
                checkedChildren={"Required"}
                unCheckedChildren={"Not Required"}
                value={each?.required}
                onChange={(checked) => {
                  handleRequired(checked, index);
                }}
              />
            </Space>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Preview;

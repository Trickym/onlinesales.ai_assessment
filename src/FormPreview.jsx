import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormPreview() {
  const location = useLocation();
  const [form] = useForm();
  const [formModal, setFormModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      message.error("You need to build a form first");
      navigate("/");
    }
  }, []);
  return (
    <div
      style={{ background: "#EBEEF8", height: "100vh", overflowY: "scroll" }}
    >
      <div className="th-builder-width mt-3 px-2">
        <div className="th-form-title-card">
          <div className="th-form-stripe p-2"></div>
          <div className="p-3">
            <Typography.Title level={3}>
              {location?.state?.formName}
            </Typography.Title>
            <hr className="m-0 mb-2" />
            <p>{location?.state?.formDescription}</p>
          </div>
        </div>
        <div className="mt-3">
          <Form
            form={form}
            layout="vertical"
            onFinish={(value) => {
              console.log({ value });
              setFormModal(true);
              setFormValues(value);
            }}
          >
            {location?.state?.formData?.map((each, index) => (
              <div className="th-form-card mb-3" key={index + each}>
                {each?.type == "checkbox" ? (
                  <Form.Item
                    valuePropName="checked"
                    label={each?.label}
                    name={each?.label?.split(" ")?.join("_")?.toLowerCase()}
                    rules={[
                      {
                        required: each?.required,
                        message: "Required Field",
                      },
                    ]}
                  >
                    {each?.options?.map((item, ind) => (
                      <Checkbox>{item?.label}</Checkbox>
                    ))}
                  </Form.Item>
                ) : (
                  <Form.Item
                    label={each?.label}
                    rules={[
                      {
                        required: each?.required,
                        message: "Required Field",
                      },
                    ]}
                    name={each?.label?.split(" ")?.join("_")?.toLowerCase()}
                  >
                    {console.log({ required: each?.required })}
                    {["number", "text"]?.includes(each?.type) &&
                      (each?.type == "number" ? (
                        <InputNumber
                          placeholder={"Enter " + each?.label}
                          size="medium"
                          className="w-100"
                        />
                      ) : (
                        <Input
                          placeholder={"Enter " + each?.label}
                          size="medium"
                          className="w-100"
                        />
                      ))}
                    {each?.type == "checkbox" && (
                      <Checkbox>{each?.label}</Checkbox>
                    )}
                    {each?.type == "radio" && (
                      <>
                        <Radio.Group>
                          <Space direction="vertical">
                            {each?.options?.map((item, ind) => (
                              <Radio
                                value={item?.label?.toLowerCase()}
                                key={ind}
                              >
                                {item?.label}
                              </Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      </>
                    )}
                    {each?.type == "select" && (
                      <Select
                        style={{
                          width: 120,
                        }}
                        options={each?.options}
                        value={each?.selected}
                        // onChange={(e) => {
                        //   handleDropdownChange(e, index);
                        // }}
                      />
                    )}
                  </Form.Item>
                )}
              </div>
            ))}
            <Row className="mb-2" justify={"space-between"}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                type="text"
              >
                Clear Form
              </Button>
            </Row>
          </Form>
        </div>
      </div>
      <Modal
        onCancel={() => {
          setFormModal(false);
        }}
        open={formModal}
        title={"Response Preview"}
        footer={null}
      >
        {Object.keys(formValues)?.map((key, ind) => (
          <div className="mb-2">
            <p style={{ textTransform: "capitalize" }}>
              Q{ind + 1}. {key?.split("_")?.join(" ")}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              Response : {formValues[key]?.toString()}
            </p>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default FormPreview;

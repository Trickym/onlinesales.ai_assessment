import { useState } from "react";
import "./App.css";
import Preview from "./components/Preview";
import ApplicationFormOptions from "./components/ApplicationFormOptions";
import {
  Button,
  Input,
  Modal,
  Checkbox,
  Radio,
  Select,
  Tooltip,
  Row,
  Space,
  FloatButton,
  message,
  Form,
} from "antd";
import { EyeOutlined, CopyOutlined, ImportOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Icon from "../public/builderIcon.svg";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

function FormBuilder() {
  const [formName, setFormName] = useState("Untitled Form");
  const [formDescriptions, setFormDescriptions] = useState("");
  const [formData, setFormData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openJsonModal, setOpenJsonModal] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();
  const handleInput = (event, index) => {
    const { name, value } = event.target;
    const updatedForm = [...formData];
    updatedForm[index].name = value;
    setFormData(updatedForm);
  };

  const handleLabel = (event, index) => {
    const { name, value } = event.target;

    const updatedForm = [...formData];
    updatedForm[index].label = value;
    setFormData(updatedForm);
  };
  const handleRequired = (checked, index) => {
    const updatedForm = [...formData];
    updatedForm[index].required = checked;
    setFormData(updatedForm);
  };
  const addBox = (index, type) => {
    let updatedForm = [...formData];
    if (type == "checkbox") {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "" },
      ];
    } else if (type == "radio") {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "", selected: false },
      ];
    } else {
      updatedForm[index].options = [
        ...updatedForm[index].options,
        { label: "", value: "", selected: "" },
      ];
    }
    setFormData(updatedForm);
  };

  const handleDeleteOption = (index, ind) => {
    console.log(index, ind);
    let updatedForm = [...formData];
    let options = updatedForm[index].options;
    options?.splice(ind, 1);
    updatedForm[index].options = options;
    setFormData(updatedForm);
  };
  const handleInputBox = (e, index, ind, type) => {
    const { name, value } = e.target;

    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions[ind].label = value;
    if (type == "select") {
      updatedOptions[ind].value = value;
    }
    setFormData(updatedForm);
  };
  const handleSelectedCheckBox = (e, index, ind) => {
    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions[ind].checked = !updatedOptions[ind].checked;
    setFormData(updatedForm);
  };

  const handleSelectedRadio = (e, index, ind) => {
    const { name, value } = e.target;

    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    updatedOptions?.map((each) => (each.selected = false));
    updatedOptions[ind].selected = true;
    setFormData(updatedForm);
  };

  const handleDropdownChange = (value, index, ind) => {
    const updatedForm = [...formData];
    const updatedOptions = [...updatedForm[index]?.options];
    const a = updatedOptions.find((each) => each.value === value);
    a.selected = true;
    setFormData(updatedForm);
  };

  const handleDelete = (index) => {
    const updatedForm = [...formData];
    updatedForm.splice(index, 1);
    setFormData(updatedForm);
  };
  console.log(formData, "formData");

  const handleCopyClick = (textToCopy) => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

    message.success("JSON copied to clipboard!");
  };
  const closeJsonModal = () => {
    setOpenJsonModal(false);
    form.resetFields();
  };
  return (
    <div
      style={{ background: "#EBEEF8", height: "100vh", overflowY: "scroll" }}
    >
      <Row className="p-3 bg-white" justify={"space-between"} align={"middle"}>
        <Space>
          <img src={Icon} height={35} />
          <Input
            bordered={false}
            // size="large"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </Space>
        <Space>
          {formData?.length > 0 && (
            <Button
              onClick={() => {
                navigate("/form-preview", {
                  state: {
                    formName: formName,
                    formData: formData,
                    formDescription: formDescriptions,
                  },
                });
              }}
              shape="square"
              icon={<EyeOutlined />}
            >
              Preview
            </Button>
          )}
          <Button
            onClick={() => {
              handleCopyClick(JSON.stringify(formData));
              setOpenModal(false);
            }}
            icon={<CopyOutlined />}
            type="primary"
          >
            Copy JSON
          </Button>
          <Button
            onClick={() => {
              setOpenJsonModal(true);
            }}
            icon={<ImportOutlined />}
          >
            Import JSON
          </Button>
        </Space>
      </Row>
      <div className="th-builder-width mt-5 px-2">
        <div className="th-form-title-card">
          <div className="th-form-stripe p-2"></div>
          <div className="p-3">
            <Input
              bordered={false}
              size="large"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <hr className="m-0 mb-2" />
            <TextArea
              value={formDescriptions}
              onChange={(e) => {
                setFormDescriptions(e.target.value);
              }}
              placeholder="Form Description"
            />
          </div>
        </div>
        <div className="th-form-items mt-3 ">
          <Preview
            formData={formData}
            setFormData={setFormData}
            handleInput={handleInput}
            handleLabel={handleLabel}
            addBox={addBox}
            handleInputBox={handleInputBox}
            handleSelectedCheckBox={handleSelectedCheckBox}
            handleSelectedRadio={handleSelectedRadio}
            handleDelete={handleDelete}
            handleRequired={handleRequired}
            handleDeleteOption={handleDeleteOption}
          />
        </div>
        <ApplicationFormOptions setFormData={setFormData} formData={formData} />
      </div>
      <Modal
        open={openModal}
        title={formName}
        width={"100%"}
        height={"100%"}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setOpenModal(false);
              alert("Form Submitted-->Check Console for Form Data");
            }}
          >
            Click and check JSON response in console
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-md-8">
            <p>Input Fileds</p>

            {formData?.map((each, index) => (
              <div
                className="d-flex flex-column my-1 p-2 border rounded"
                key={index + each}
                style={{ background: "#faf9f6" }}
              >
                <div className="d-flex flex-column align-items-start">
                  <div className="w-50">
                    <label>{each?.label}</label>
                  </div>
                  {["number", "text"]?.includes(each?.type) && (
                    <Input
                      name={each?.name}
                      type={each?.type}
                      placeholder="Enter Field Value"
                      onChange={(e) => handleInput(e, index)}
                      size="medium"
                      className="w-100"
                    />
                  )}
                  {["checkbox", "radio"]?.includes(each?.type) && (
                    <>
                      {each?.options?.map((item, ind) => (
                        <div className="d-flex align-items-center">
                          {each?.type == "checkbox" && (
                            <Checkbox
                              checked={item?.checked}
                              onChange={(e) =>
                                handleSelectedCheckBox(e, index, ind)
                              }
                            />
                          )}
                          {each?.type == "radio" && (
                            <Radio
                              checked={item?.selected}
                              value={item?.label}
                              name={item?.name}
                              onChange={(e) =>
                                handleSelectedRadio(e, index, ind)
                              }
                            />
                          )}
                          <p className="m-0 px-1">{item?.label}</p>
                        </div>
                      ))}
                    </>
                  )}
                  {each?.type == "select" && (
                    <Select
                      style={{
                        width: 120,
                      }}
                      options={each?.options}
                      value={each?.selected}
                      onChange={(e) => {
                        handleDropdownChange(e, index);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <p>Response</p>
            {formData?.map((each, index) => (
              <div
                className="d-flex flex-column my-1 p-2 border rounded"
                key={index + each}
                style={{ background: "#faf9f6" }}
              >
                <div className="d-flex flex-column align-items-start">
                  <div className="w-50">
                    <label>{each?.label}</label>
                    <p>-- {each?.name}</p>
                  </div>
                  {["checkbox", "radio"]?.includes(each?.type) && (
                    <>
                      {each?.options?.map((item, ind) => (
                        <div className="d-flex align-items-center">
                          {each?.type == "checkbox" && item?.checked && (
                            <p className="m-0 px-1">{item?.label}</p>
                          )}
                          {each?.type == "radio" && item?.selected && (
                            <p className="m-0 px-1">{item?.label}</p>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {each?.type == "select" &&
                    each?.options?.filter((each) => each?.selected)[0]?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        open={openJsonModal}
        onCancel={closeJsonModal}
        title="Paste your JSON"
        okText={"Submit"}
        okButtonProps={{
          htmlType: "submit",
          type: "primary",
          form: "jsonForm",
        }}
      >
        <Form
          form={form}
          id="jsonForm"
          onFinish={(value) => {
            message.success("Import Successfull");
            setFormData(JSON.parse(value.json));
            closeJsonModal();
          }}
          layout="vertical"
        >
          <Form.Item
            name={"json"}
            label="JSON"
            rules={[{ required: "true", message: "JSON is required!" }]}
          >
            <TextArea rows={4} placeholder="JSON goes here..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FormBuilder;

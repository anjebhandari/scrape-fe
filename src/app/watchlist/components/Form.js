import React from "react";
import { Form, Card, Row, Col, Button, InputNumber } from "antd";

export const AddForm = (props) => {
  console.log("🚀 ~ file: Form.js:5 ~ AddForm ~ props:", props);
  const { id, code, add } = props;
  const [form] = Form.useForm();

  const validateMessages = {
    required: "Required.",
  };

  const onFinish = (formData) => {
      formData.id = id;
      formData.code = code;
      add(formData).then(() => {
          props.fetchWatchList();
          form.resetFields();
      });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Row gutter={24}>
        <Form.Item
          name={["min_price"]}
          label="Minimum Price"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
      </Row>
      <Row gutter={24}>
        <Form.Item
          name={["max_price"]}
          label="Maximum Price"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
      </Row>
      <Row gutter={24}>
        <Col xl={8} lg={8} xs={8}>
          <Form.Item noStyle shouldUpdate={true}>
            {() => (
              <Button type="primary" className="mr-1" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddForm;

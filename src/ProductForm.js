import { useEffect } from 'react';
import { Form, Select, Input, Button } from 'antd';
import "./ProductForm.css";

const {Option} = Select

const ProductForm = ({ product, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (product) {
        form.setFieldsValue(product);
      } else {
        form.resetFields();
    }}, [product, form]);

    const handleSave = (event) => {
      event.preventDefault()
      form.validateFields().then(values => {
        onSave(values);
        form.resetFields();
      });
    };
  
    return (
      <Form form={form} layout="vertical" initialValues={product ? product : {}}  className="product-form">
        <Form.Item className="product-form-item" name="category" label="Category">
          <Select>
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Home & Kitchen">Home & Kitchen</Option>
            <Option value="Sports & Outdoors">Sports & Outdoors</Option>
            <Option value="Beauty">Beauty</Option>
          </Select>
        </Form.Item>
        <Form.Item className="product-form-item" name="name" label="Name" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item className="product-form-item" name="description" label="Description" rules={[{ required: true, message: 'Please enter product description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item className="product-form-item" name="price" label="Price" rules={[{ required: true, message: 'Please enter product price' }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" onClick={handleSave}>Save</Button>
      </Form>
    );
  };

  export default ProductForm
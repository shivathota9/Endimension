import React, { useState } from 'react';
import { Table, Button, Modal, Input, Select, Row, Col } from 'antd';

import ProductForm from './ProductForm';
import './App.css';

const { Option } = Select;

const initialProducts = [
  { id: 1, category: 'Electronics', name: 'Laptop', description: 'Powerful laptop', price: 1000 },
  { id: 2, category: 'Clothing', name: 'T-shirt', description: 'Comfortable t-shirt', price: 20 },
  { id: 3, category: 'Electronics', name: 'Smartphone', description: 'Latest smartphone model', price: 800 },
  { id: 4, category: 'Books', name: 'Programming in JavaScript', description: 'A comprehensive guide to JavaScript programming', price: 40 },
  { id: 5, category: 'Electronics', name: 'Headphones', description: 'High-quality headphones with noise cancellation', price: 150 },
  { id: 6, category: 'Clothing', name: 'Jeans', description: 'Classic denim jeans', price: 50 },
  { id: 7, category: 'Books', name: 'Data Structures and Algorithms', description: 'Essential concepts for software engineering interviews', price: 30 },
  { id: 8, category: 'Home & Kitchen', name: 'Coffee Maker', description: 'Automatic coffee maker with programmable settings', price: 80 },
  { id: 9, category: 'Electronics', name: 'Smartwatch', description: 'Fitness tracking smartwatch', price: 200 },
  { id: 10, category: 'Books', name: 'The Great Gatsby', description: 'Classic novel by F. Scott Fitzgerald', price: 10 },
  { id: 11, category: 'Clothing', name: 'Dress Shirt', description: 'Formal dress shirt for men', price: 30 },
  { id: 12, category: 'Electronics', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 25 },
  { id: 13, category: 'Beauty', name: 'Perfume', description: 'Fragrance for women', price: 60 },
  { id: 14, category: 'Books', name: 'Harry Potter and the Sorcerer\'s Stone', description: 'First book in the Harry Potter series', price: 15 },
  { id: 15, category: 'Sports & Outdoors', name: 'Running Shoes', description: 'Lightweight running shoes for men', price: 80 },
  { id: 16, category: 'Home & Kitchen', name: 'Blender', description: 'High-speed blender for smoothies', price: 70 },
  { id: 17, category: 'Electronics', name: 'Wireless Earbuds', description: 'Bluetooth earbuds with long battery life', price: 120 },
  { id: 18, category: 'Clothing', name: 'Sweater', description: 'Cozy sweater for chilly days', price: 40 },
  { id: 19, category: 'Home & Kitchen', name: 'Air Fryer', description: 'Healthy cooking with less oil', price: 100 },
  { id: 20, category: 'Beauty', name: 'Lipstick', description: 'Long-lasting lipstick in vibrant colors', price: 15 },
];

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setVisible(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleSaveProduct = (values) => {
    if (selectedProduct) {
      setProducts(products.map(product =>
        product.id === selectedProduct.id ? { ...product, ...values } : product
      ));
    } else {
      const newProduct = { ...values, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    setVisible(false);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = searchCategory==="All" ? product : product.category === searchCategory;
    const nameMatch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const descriptionMatch = product.description.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && (nameMatch || descriptionMatch);
  });

  const categories = [...new Set(products.map(product => product.category))];

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className='btn-contianer'>
          <Button className='edit-btn' onClick={() => handleEditProduct(record)}>Edit</Button>
          <Button className='delete-btn' onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="container">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <h3>Total Products: {products.length}</h3>
        </Col>
        <Col span={8}>
          <h3>Unique Categories: {categories.length}</h3>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input className="search-input" placeholder="Search by name or description" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </Col>
        <Col span={8}>
          <Select className="search-input" placeholder="Select category" onChange={(value) => setSearchCategory(value)}>
            <Option key='all' value="All" selected>All</Option>
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Button className="add-btn" onClick={handleAddProduct}>Add Product</Button>
        </Col>
      </Row>

      <Table className="product-table" dataSource={filteredProducts} columns={columns} />

      <Modal
        className="product-modal"
        visible = {visible}
        title={selectedProduct ? "Edit Product" : "Add Product"}
        onCancel={() => {
          setVisible(false);
          setSelectedProduct(null); 
        }}
        footer={null}
      >
        <ProductForm product={selectedProduct} onSave={handleSaveProduct} />
      </Modal>
    </div>
  );
};

export default App;
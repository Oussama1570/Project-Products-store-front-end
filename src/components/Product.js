import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import mockProducts from './data/mockProducts.js';


const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const handleCategoryChange = (category) => setCategoryFilter(category);
  const handlePriceChange = (price) => setPriceFilter(price);

  const filteredProducts = mockProducts.filter((product) => {
    return (
      (!categoryFilter || product.category === categoryFilter) &&
      (!priceFilter || product.price <= priceFilter)
    );
  });

  return (
    <Container>
      <Row className="mb-4">
        <Col md={3}>
          <div className="filter-section">
            <h4>Filters</h4>
            <DropdownButton id="category-dropdown" title="Category" variant="secondary" className="filter-dropdown">
              <Dropdown.Item onClick={() => handleCategoryChange('cheveux')}>Cheveux</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('visage')}>Visage</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('soin')}>Soin</Dropdown.Item>
            </DropdownButton>

            <DropdownButton id="price-dropdown" title="Price" variant="secondary" className="filter-dropdown mt-3">
              <Dropdown.Item onClick={() => handlePriceChange(15)}>Up to $15</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(25)}>Up to $25</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(30)}>Up to $30</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>

        <Col md={9}>
          <h4 className="products-title">Products</h4>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={4} className="mb-4">
                <div className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h5>{product.name}</h5>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-price">Price: ${product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;

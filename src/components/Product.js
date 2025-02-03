import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import mockProducts from '../components/data/mockProducts.js';


const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCategoryChange = (category) => setCategoryFilter(category);
  const handlePriceChange = (price) => setPriceFilter(price);

  const filteredProducts = mockProducts.filter((product) => {
    return (
      (!categoryFilter || product.category === categoryFilter) &&
      (!priceFilter || product.price <= priceFilter)
    );
  });

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

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
              <Dropdown.Item onClick={() => handlePriceChange(15)}>Up to 15 TND</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(25)}>Up to 25 TND</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(30)}>Up to 30 TND</Dropdown.Item>
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
                  <p className="product-price">Price: {product.price} TND</p>
                  <button className="learn-more-btn" onClick={() => handleShowModal(product)}>Learn More</button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image-modal" />
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> {selectedProduct.price} TND</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Products;

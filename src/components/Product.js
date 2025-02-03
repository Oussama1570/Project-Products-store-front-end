import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import mockProducts from '../data/mockProducts'; // Make sure you import your data file
import '../Styles/StylesProduits.css'; // Import your styles

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (category) => setCategoryFilter(category);
  const handlePriceChange = (price) => setPriceFilter(price);
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const filteredProducts = mockProducts.filter((product) => {
    return (
      (!categoryFilter || product.category === categoryFilter) &&
      (!priceFilter || product.price <= priceFilter)
    );
  });

  return (
    <Container>
      <Row>
        {/* Filter Sidebar */}
        <Col md={3} className="filter-section">
          <h4>Filters</h4>
          <DropdownButton id="category-dropdown" title="Category" className="filter-dropdown">
            <Dropdown.Item onClick={() => handleCategoryChange('cheveux')}>Cheveux</Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange('visage')}>Visage</Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange('soin')}>Soin</Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="price-dropdown" title="Price" className="filter-dropdown">
            <Dropdown.Item onClick={() => handlePriceChange(15)}>Up to 15 TND</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriceChange(25)}>Up to 25 TND</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriceChange(30)}>Up to 30 TND</Dropdown.Item>
          </DropdownButton>
        </Col>

        {/* Product Cards */}
        <Col md={9}>
          <h4 className="products-title">Products</h4>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={4}>
                <div className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h5>{product.name}</h5>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-price">Price: {product.price} TND</p>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(product)}
                    className="learn-more-btn"
                  >
                    Learn More
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Product Modal */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> {selectedProduct.price} TND</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="product-image"
            />
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

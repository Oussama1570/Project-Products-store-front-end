import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Button, Modal } from 'react-bootstrap';
import mockProducts from './data/mockProducts.js'; 


const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(6); // Number of initially visible products

  const handleCategoryChange = (category) => setCategoryFilter(category);
  const handlePriceChange = (price) => setPriceFilter(price);
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleLoadMore = () => setVisibleProducts((prev) => prev + 6); // Load more products in increments of 6

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
          <h4>Filtrer les produits</h4>
          <div className="filter-category">
            <DropdownButton id="category-dropdown" title="Category" className="filter-dropdown">
              <Dropdown.Item onClick={() => handleCategoryChange('cheveux')}>Cheveux</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('visage')}>Visage</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('soin')}>Soin</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="filter-price">
            <DropdownButton id="price-dropdown" title="Price" className="filter-dropdown">
              <Dropdown.Item onClick={() => handlePriceChange(15)}>Up to 15 TND</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(25)}>Up to 25 TND</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceChange(30)}>Up to 30 TND</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="clear-filters">
            <Button variant="secondary" onClick={() => { setCategoryFilter(''); setPriceFilter(''); }}>
              Effacer les filtres
            </Button>
          </div>
        </Col>

        {/* Product Cards */}
        <Col md={9}>
          <h4 className="products-title">Produits</h4>
          <Row>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
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
                    apprendre encore plus
                  </Button>
                </div>
              </Col>
            ))}
          </Row>

          {/* Load More Button */}
          {visibleProducts < filteredProducts.length && (
            <Button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
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
            <Button variant="danger" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Products;

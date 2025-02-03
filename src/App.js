// Navbar.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Product from './components/Product.js';

const App = () => {
  return (
   
      <div>
        <h1>Welcome to the Pharmacy Store</h1>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Pharmacy Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/" element={<div>Welcome to the home page</div>} />
        </Routes>
      </div>
    
  );
};

export default App;
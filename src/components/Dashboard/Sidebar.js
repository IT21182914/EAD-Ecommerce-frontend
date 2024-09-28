// src/components/Dashboard/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaWarehouse,
  FaChartLine,
  FaTruck,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{ width: "240px", height: "100vh", position: "fixed" }}
    >
      <h4 className="text-center mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <LinkContainer to="/admin-dashboard">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaChartLine className="me-2" /> Dashboard
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manage-users">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaUser className="me-2" /> User Management
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manage-products">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaBoxOpen className="me-2" /> Product Management
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manage-orders">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaClipboardList className="me-2" /> Order Management
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manage-inventory">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaWarehouse className="me-2" /> Inventory Management
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/manage-vendors">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaTruck className="me-2" /> Vendor Management
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/reports">
          <Nav.Link className="text-white mb-2 d-flex align-items-center">
            <FaChartLine className="me-2" /> Reports
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaBoxOpen,
  FaWarehouse,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  return (
    <div
      className="d-flex flex-column p-3 bg-light text-dark"
      style={{ width: "240px", height: "100vh", position: "fixed" }}
    >
      <h4 className="text-center mb-4">Vendor Panel</h4>
      <Nav className="flex-column">
        {role === "vendor" && (
          <>
            <LinkContainer to="/vendor-dashboard">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaBoxOpen className="me-2" /> Manage Products
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vendor-inventory">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaWarehouse className="me-2" /> Manage Inventory
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vendor-orders">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaClipboardList className="me-2" /> Track Orders
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vendor-feedback">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaStar className="me-2" /> View Feedback
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;

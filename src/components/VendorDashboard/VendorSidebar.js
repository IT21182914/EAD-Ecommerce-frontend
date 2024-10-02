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
      className="d-flex flex-column p-3 text-white sidebar"
      style={{
        width: "240px",
        height: "100vh",
        position: "fixed",
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8)), url('/path/to/your/image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center mb-4">
        <h4 className="text-white">Vendor Panel</h4>
      </div>
      <Nav className="flex-column">
        {role === "vendor" && (
          <>
            <LinkContainer to="/vendor/dashboard">
              <Nav.Link className="text-white mb-3 d-flex align-items-center">
                <FaBoxOpen className="me-3" /> Manage Products
              </Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/vendor/inventory">
              <Nav.Link className="text-white mb-3 d-flex align-items-center">
                <FaWarehouse className="me-3" /> Manage Inventory
              </Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/vendor/products">
              <Nav.Link className="text-white mb-3 d-flex align-items-center">
                <FaClipboardList className="me-3" /> Track Orders
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vendor/feedback">
              <Nav.Link className="text-white mb-3 d-flex align-items-center">
                <FaStar className="me-3" /> View Feedback
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;

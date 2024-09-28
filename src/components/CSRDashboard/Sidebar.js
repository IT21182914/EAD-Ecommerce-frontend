import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser, FaClipboardList, FaCommentDots, FaBan } from "react-icons/fa";

const Sidebar = ({ role }) => {
  return (
    <div
      className="d-flex flex-column p-3 bg-light text-dark"
      style={{ width: "240px", height: "100vh", position: "fixed" }}
    >
      <h4 className="text-center mb-4">CSR Panel</h4>
      <Nav className="flex-column">
        {role === "csr" && (
          <>
            <LinkContainer to="/csr-dashboard">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaUser className="me-2" /> Manage Accounts
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/csr-orders">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaClipboardList className="me-2" /> Manage Orders
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/csr-support">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaCommentDots className="me-2" /> Customer Support
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/csr-cancellations">
              <Nav.Link className="text-dark mb-2 d-flex align-items-center">
                <FaBan className="me-2" /> Cancellations
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;

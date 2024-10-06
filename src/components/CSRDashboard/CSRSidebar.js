import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser, FaClipboardList, FaCommentDots, FaBan } from "react-icons/fa";

const Sidebar = () => {
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
        <h4 className="text-white">CSR Panel</h4>
      </div>
      <Nav className="flex-column">
        <LinkContainer to="/csr/dashboard">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaUser className="me-3" />
            Manage Accounts
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/csr/activation">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaClipboardList className="me-3" />
            Account Activation
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/csr/changepassword">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaCommentDots className="me-3" />
            Change Password
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/csr-cancellations">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaBan className="me-3" />
            Cancellations
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default Sidebar;

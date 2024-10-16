import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaChartLine,
  FaBell,
  FaMapMarkerAlt,
  FaAtom,
  FaFistRaised,
} from "react-icons/fa";

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
        <h4 className="text-white">Admin Panel</h4>
      </div>
      <Nav className="flex-column">
        <LinkContainer to="/admin/dashboard">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaChartLine className="me-3" />
            Dashboard
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/create/vendor">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaUser className="me-3" />
            Create Accounts
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/manage/orders">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaBoxOpen className="me-3" />
            Manage Orders
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/manage/products">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaAtom className="me-3" />
            Manage Products
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/account/activation">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaClipboardList className="me-3" />
            Activate Accounts
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/cancelations">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaFistRaised className="me-3" />
            Cancel Requests
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/notifications">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaBell className="me-3" />
            Notifications
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default Sidebar;

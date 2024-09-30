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
        <LinkContainer to="/user-profile">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaUser className="me-3" />
            User Profile
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/table-list">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaBoxOpen className="me-3" />
            Table List
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/typography">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaAtom className="me-3" />
            Typography
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/icons">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaClipboardList className="me-3" />
            Icons
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/maps">
          <Nav.Link className="text-white mb-3 d-flex align-items-center">
            <FaMapMarkerAlt className="me-3" />
            Maps
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/notifications">
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

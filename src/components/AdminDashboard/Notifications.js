import React from "react";
import Sidebar from "./AdminSidebar";
import { Container } from "react-bootstrap";
import AdminNavBar from "./AdminNavBar";

export default function Notifications() {
  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar notification={[]} />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="container">
            <h1>Notifications</h1>
          </div>
        </Container>
      </div>
    </div>
  );
}

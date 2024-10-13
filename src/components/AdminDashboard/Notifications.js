import React, { useState, useEffect, useRef, useContext } from "react";
import Sidebar from "./AdminSidebar";
import { Container, Spinner } from "react-bootstrap";
import AdminNavBar from "./AdminNavBar";

import { FaBell } from "react-icons/fa";
import { Badge, Card, ListGroup } from "react-bootstrap";
import API_BASE_URL from "../../config";
import axios from "axios";

import { AuthContext } from "../../Context/AuthContext";

export default function Notifications() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}Notification/my/notifications?userId=${user.id}`)
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [refresh]);

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
          className="p-4 overflow-y-hidden"
          style={{ height: "100%" }}
        >
          <div className="container">
            <h1>Notifications</h1>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              ></Spinner>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "92%",
                overflow: "scroll",
                borderRadius: "10px",
                overflowX: "hidden",
                zIndex: 10,
                transition: "all 0.3s ease",
              }}
            >
              <Card.Header
                style={{
                  color: "white",
                  borderRadius: "10px 10px 0 0",
                  padding: "12px 15px",
                  position: "sticky",
                  top: "0",
                  zIndex: 10,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></Card.Header>

              <ListGroup variant="flush">
                {notifications.length === 0 ? (
                  <ListGroup.Item
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No new notifications
                  </ListGroup.Item>
                ) : (
                  notifications.map((notification) => (
                    <ListGroup.Item
                      key={notification.notifyId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "15px",
                        fontSize: "0.9rem",
                        paddingBottom: "10px",
                        //   color: "#333",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#c8cdff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontWeight: 600 }}>
                          {notification &&
                          notification.reason ==
                            "Customer request cancelation" ? (
                            <a href={`/admin/cancelations?orderId=${"string"}`}>
                              Customer request cancelation
                            </a>
                          ) : (
                            notification.reason
                          )}
                        </strong>{" "}
                        {notification.message}
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#888",
                            marginTop: "5px",
                          }}
                        >
                          {notification.sentDate}
                        </div>
                      </div>
                      {notification.isNew && (
                        <Badge
                          pill
                          bg="success"
                          style={{
                            fontSize: "0.75rem",
                            padding: "5px 10px",
                            marginLeft: "10px",
                          }}
                        >
                          NEW
                        </Badge>
                      )}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

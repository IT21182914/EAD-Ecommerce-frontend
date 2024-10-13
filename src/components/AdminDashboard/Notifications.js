import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./AdminSidebar";
import {
  Col,
  Container,
  Row,
  Spinner,
  Badge,
  Card,
  ListGroup,
} from "react-bootstrap";
import AdminNavBar from "./AdminNavBar";
import { FaEnvelopeOpenText } from "react-icons/fa";
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
      .get(`${API_BASE_URL}Notification/all?userRole=${user.role}`)
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [refresh]);

  const handleMarkAsRead = async (id) => {
    // Mark notification as read in the database
    try {
      console.log("Mark as read:", id);
      const result = await axios
        .patch(
          `${API_BASE_URL}Notification/mark/read?notificationId=${id}&readBy=${user.email}`
        )
        .then((res) => {
          console.log(res);
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  }

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar globalRefresh={refresh} globalRefreshHandle={handleRefresh} />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 d-flex justify-content-center">
              <h2
                className="mb-4"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(91, 33, 182, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Notifications
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "82%",
                overflow: "scroll",
                borderRadius: "10px",
                overflowX: "hidden",
                scrollbarColor: "#5b21b6 #f0f0f0",
                scrollbarWidth: "thin",
                scrollBehavior: "smooth",
              }}
            >
              <Card.Header
                style={{
                  color: "white",
                  backgroundColor: "#5b21b6",
                  borderRadius: "10px 10px 0 0",
                  padding: "12px 15px",
                  position: "sticky",
                  top: "0",
                  zIndex: 10,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                All Notifications
              </Card.Header>

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
                        borderBottom: "1px solid #f0f0f0",
                        backgroundColor: notification.isRead
                          ? "#fff"
                          : "#e0f7fa",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#e3f2fd";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          notification.isRead ? "#fff" : "#e0f7fa";
                      }}
                    >
                      <div className="d-flex justify-content-between w-100">
                        <div>
                          <strong style={{ fontWeight: 600 }}>
                            {notification && notification.scenario === 3 ? (
                              <a
                                href={`/admin/cancelations?orderId=${notification.scenarioId}`}
                                style={{
                                  color: "#1d4ed8",
                                  textDecoration: "none",
                                }}
                              >
                                Customer request cancellation
                              </a>
                            ) : (
                              notification.scenario
                            )}
                          </strong>
                          {notification.isRead != true && (
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
                          <p style={{ margin: 0 }}>{notification.message}</p>
                          {notification.readBy && (
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "#888",
                                marginTop: "5px",
                              }}
                            >
                              <strong>Read by :</strong>
                              &nbsp;
                              {notification.readBy}
                            </div>
                          )}
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#888",
                              marginTop: "5px",
                            }}
                          >
                            {new Date(
                              notification.createdDate
                            ).toLocaleString()}
                          </div>
                        </div>

                        <button
                          className="d-flex justify-content-center align-content-center h-100 rounded-4 bg-light border-1"
                          style={{ padding: "8px" }}
                          disabled={notification.isRead}
                          onClick={(e) => {
                            e.preventDefault();
                            handleMarkAsRead(notification.notifyId);
                          }}
                        >
                          <FaEnvelopeOpenText
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#5b21b6",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </div>
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

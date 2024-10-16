import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBell } from "react-icons/fa";
import { Badge, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../../config";
import { AuthContext } from "../../Context/AuthContext";

const VendorNotificationBell = ({ notifications, handleRefresh }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(notifications);

  const getNotificationCount = () => {
    let count = 0;
    notifications.forEach((element) => {
      if (element.isRead === false) {
        count++;
      }
    });
    console.log(count);
    return count;
  };

  const dropdownRef = useRef(null);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsread = async (id) => {
    // Mark notification as read in the database
    try {
      console.log("Mark as read:", id);
      const result = await axios
        .patch(
          `${API_BASE_URL}Notification/mark/read?notificationId=${id}&readBy=${user.email}`
        )
        .then((res) => {
          console.log(res);
          handleRefresh();
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle click outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotifications(false); // Close the dropdown
    }
  };

  // Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      // onClick={handleToggleNotifications}
      ref={dropdownRef}
    >
      {/* Bell Icon with Notification Count */}
      <FaBell
        size={28}
        style={{ color: "#FFC107", cursor: "pointer" }}
        onClick={handleToggleNotifications}
      />
      {getNotificationCount() > 0 && (
        <Badge
          pill
          bg="danger"
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            fontSize: "0.8rem",
            padding: "5px 7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {getNotificationCount()}
        </Badge>
      )}

      {/* Notification Dropdown */}
      {showNotifications && (
        <Card
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            width: "350px",
            height: "500px",
            overflowY: "auto",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            transition: "all 0.3s ease",
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "#007bff",
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
          >
            Notifications
          </Card.Header>

          <ListGroup variant="flush">
            {notifications.length === 0 ? (
              <ListGroup.Item style={{ textAlign: "center", padding: "20px" }}>
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
                    backgroundColor: notification.isRead ? "#fff" : "#b2ebf2",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background-color 0.3s ease, opacity 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    markAsread(notification.notifyId);
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontWeight: 600 }}>
                      {notification &&
                      notification.reason ===
                        "Customer request cancelation." ? (
                        <a href="/admin/cancelations">
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
                      {notification.createdDate}
                    </div>
                  </div>
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
                </ListGroup.Item>
              ))
            )}
          </ListGroup>

          <Card.Footer
            className="text-center"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "0 0 10px 10px",
              padding: "12px",
              cursor: "pointer",
              position: "sticky",
              bottom: "0",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
            }}
          >
            View All Notifications
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default VendorNotificationBell;

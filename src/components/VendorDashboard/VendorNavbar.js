import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import VendorNotificationBell from "./VendorNotificationBell.js";
import ProfileActionButton from "../Common/ProfileActionButton";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config.js";

export default function VendorNavbar() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}Notification/my/notifications?userId=${user.id}`)
      .then((response) => {
        setNotifications(response.data);
      });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div
      className="d-flex flex-row p-3 text-white"
      style={{
        width: "100%",
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8)), url('/path/to/your/image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Nav
        className="d-flex flex-row align-items-center gap-3"
        style={{ width: "100%", placeContent: "flex-end" }}
      >
        <VendorNotificationBell
          notifications={notifications}
          handleRefresh={handleRefresh}
        />
        <ProfileActionButton />
      </Nav>
    </div>
  );
}

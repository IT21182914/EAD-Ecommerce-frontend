/**
 * AdminNavBar.js
 * 
 * This component represents the navigation bar for the admin dashboard.
 * It displays notifications for the logged-in admin and includes a profile action button.
 * 
 * Features:
 * - Fetches and displays notifications specific to the logged-in user using an API call.
 * - Provides a notification bell icon that shows the count of notifications.
 * - Includes a profile action button for user profile management.
 * 
 * Author: Herath R P N M
 * Registration Number: IT21177828
 * Date: 2024-10-08
 */


import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import NotificationBell from "./NotificationBell";
import ProfileActionButton from "../Common/ProfileActionButton";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config.js";

export default function AdminNavBar({ notification }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}Notification/my/notifications?userId=${user.id}`)
      .then((response) => {
        setNotifications(response.data);
      });
  }, [notification]);

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
        <NotificationBell notifications={notifications} />
        <ProfileActionButton />
      </Nav>
    </div>
  );
}

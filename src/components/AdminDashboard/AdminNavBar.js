import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import NotificationBell from "./NotificationBell";
import ProfileActionButton from "../Common/ProfileActionButton";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config.js"


export default function AdminNavBar({ notification }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}Notification/my/notifications?userId=${user.id}`,)
      .then((response) => {
        // console.log(response.data);
        setNotifications(response.data);
      });
  }, [notification]);
  return (
    <div
      className="d-flex flex-row p-3 text-white"
      style={{
        width: "100%",
        // position: "fixed",
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

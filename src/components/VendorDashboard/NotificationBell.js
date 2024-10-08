import React from "react";
import { FaBell } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = ({
  lowStockProducts,
  showNotifications,
  handleBellClick,
  handleProductClick,
  setShowNotifications,
}) => {
  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onClick={handleBellClick}
    >
      <FaBell size={32} color="#ffc107" />
      {lowStockProducts.length > 0 && (
        <Badge
          pill
          bg="danger"
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
          }}
        >
          {lowStockProducts.length}
        </Badge>
      )}
      <NotificationDropdown
        lowStockProducts={lowStockProducts}
        showNotifications={showNotifications}
        handleProductClick={handleProductClick}
        setShowNotifications={setShowNotifications}
      />
    </div>
  );
};

export default NotificationBell;

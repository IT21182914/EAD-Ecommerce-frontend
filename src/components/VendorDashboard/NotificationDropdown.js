import React, { useRef, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";

const NotificationDropdown = ({
  lowStockProducts,
  showNotifications,
  handleProductClick,
  setShowNotifications,
}) => {
  const dropdownRef = useRef(null);

  // Close notifications dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, setShowNotifications]);

  return (
    <>
      {showNotifications && (
        <div
          ref={dropdownRef}
          className="notification-dropdown"
          style={{
            position: "absolute",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            right: "0",
            top: "40px",
            zIndex: 1000,
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-3">Notifications</h5>
          </div>
          <ListGroup variant="flush">
            {lowStockProducts.length === 0 ? (
              <ListGroup.Item>No new notifications</ListGroup.Item>
            ) : (
              lowStockProducts.map((product) => (
                <ListGroup.Item
                  key={product.productId}
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{product.name}</strong>
                      <p className="mb-0">
                        Low stock: {product.stockQuantity} left
                      </p>
                    </div>
                    <Badge pill bg="warning" className="ml-2">
                      Low Stock
                    </Badge>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
      )}
    </>
  );
};

export default NotificationDropdown;

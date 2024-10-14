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
          className="notification-dropdown animated-slide-in"
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
                  className="animated-list-item"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{product.name}</strong>
                      <p className="mb-0">
                        Low stock: {product.stockQuantity} left
                      </p>
                    </div>
                    <Badge pill bg="warning" className="animated-badge ml-2">
                      Low Stock
                    </Badge>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
      )}

      <style jsx>{`
        .animated-slide-in {
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animated-list-item {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .animated-list-item:hover {
          background-color: #f8f9fa;
          transform: translateX(5px);
        }

        .animated-badge {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(255, 206, 86, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(255, 206, 86, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(255, 206, 86, 0.7);
          }
        }
      `}</style>
    </>
  );
};

export default NotificationDropdown;

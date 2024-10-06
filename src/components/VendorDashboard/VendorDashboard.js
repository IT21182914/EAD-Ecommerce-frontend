import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./VendorSidebar";
import {
  FaBoxOpen,
  FaWarehouse,
  FaClipboardList,
  FaStar,
  FaBell,
} from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationDropdown from "./NotificationDropdown";
import API_BASE_URL from "../../config";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VendorDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // Toggle the dropdown
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Orders Processed",
        data: [150, 200, 170, 250],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["In Stock", "Out of Stock", "Low Stock"],
    datasets: [
      {
        label: "Inventory Status",
        data: [60, 25, 15],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,99,132,1)",
          "rgba(255,206,86,1)",
        ],
        hoverBackgroundColor: [
          "rgba(75,192,192,0.8)",
          "rgba(255,99,132,0.8)",
          "rgba(255,206,86,0.8)",
        ],
      },
    ],
  };

  useEffect(() => {
    // Fetch products and check for low stock items
    axios
      .get(`${API_BASE_URL}vendor/products/all`)
      .then((response) => {
        const products = response.data;
        const lowStock = products.filter(
          (product) => product.stockQuantity < 5
        );
        setLowStockProducts(lowStock);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      });
  }, []);

  const handleAddProductClick = () => {
    navigate("/vendor/create"); // Navigate to the "vendor/create" route
  };

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev); // Toggle notifications dropdown
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product for modal
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="d-flex">
      <Sidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        {/* Dashboard Header */}
        <div className="heading-container">
          <h2 className="heading-style">Vendor Dashboard</h2>
        </div>

        <style jsx>{`
          .heading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 20px 0;
          }

          .heading-style {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            font-weight: 800;
            padding: 20px 40px;
            border-radius: 12px;
            display: inline-block;
            text-align: center;
            font-size: 2rem;
            font-family: "Poppins", sans-serif;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 0.3s ease;
          }

          .heading-style:hover {
            transform: scale(1.05);
          }
        `}</style>

        <div className="d-flex justify-content-between mb-4">
          <Button
            className="btn"
            style={{
              backgroundColor: "#000",
              border: "none",
              color: "#fff",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#333";
              e.target.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.transform = "translateY(0)";
            }}
            onClick={handleAddProductClick}
          >
            Add Product
          </Button>

          {/* Notification Bell Icon */}
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

            {/* Notifications Dropdown */}
            <NotificationDropdown
              lowStockProducts={lowStockProducts}
              showNotifications={showNotifications}
              handleProductClick={handleProductClick}
              setShowNotifications={setShowNotifications}
            />
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            centered
            dialogClassName="custom-modal-size custom-modal-position"
          >
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="product-card" style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={selectedProduct.imageUrl || "default-image.jpg"}
                  style={{
                    objectFit: "cover",
                    height: "300px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{selectedProduct.name}</Card.Title>
                  <Card.Text>{selectedProduct.description}</Card.Text>
                  <p>
                    <strong>Price:</strong> ${selectedProduct.price}
                  </p>
                  <p>
                    <strong>Stock Quantity:</strong>{" "}
                    {selectedProduct.stockQuantity}
                  </p>
                  <p>
                    <strong>Stock Status:</strong> {selectedProduct.stockStatus}
                  </p>
                </Card.Body>
              </Card>
            </Modal.Body>
          </Modal>
        )}

        <Row className="mb-4">
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaBoxOpen size={30} className="text-primary" />
                <h3 className="my-2">500</h3>
                <p>Products Listed</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Update Now</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaWarehouse size={30} className="text-warning" />
                <h3 className="my-2">120</h3>
                <p>Items in Stock</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Update Now</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={30} className="text-success" />
                <h3 className="my-2">150</h3>
                <p>Orders Processed</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Last Month</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaStar size={30} className="text-danger" />
                <h3 className="my-2">4.5</h3>
                <p>Average Rating</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Update Now</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Orders Processed</Card.Title>
                <p>Monthly Overview</p>
                <Line
                  data={lineData}
                  options={{ responsive: true, animation: { duration: 1000 } }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Inventory Status</Card.Title>
                <p>Current Stock Levels</p>
                <Pie
                  data={pieData}
                  options={{ responsive: true, animation: { duration: 1000 } }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </div>
  );
};

export default VendorDashboard;

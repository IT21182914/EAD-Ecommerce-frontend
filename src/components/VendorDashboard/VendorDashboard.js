import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  ListGroup,
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
  const [showModal, setShowModal] = useState(false); // Modal to show low stock details

  useEffect(() => {
    // Fetch products and check for low stock items
    axios
      .get(`https://localhost:44321/api/v1/vendor/products/all`)
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

  const handleBellClick = () => {
    setShowModal(true); // Show modal with low stock products
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex">
      <Sidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <div className="text-center mb-4">
          <h2
            className="mb-0"
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              background:
                "linear-gradient(90deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
            }}
          >
            Vendor Dashboard
          </h2>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <Button
            className="btn btn-lg"
            style={{
              backgroundColor: "#000",
              border: "none",
              color: "#fff",
              fontWeight: "500",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              transform: "translateY(0)",
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
          </div>
        </div>

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

        {/* Modal for low stock products */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Low Stock Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {lowStockProducts.map((product) => (
                <ListGroup.Item key={product.productId}>
                  {product.name} - Only {product.stockQuantity} left!
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

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

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./VendorSidebar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationDropdown from "./NotificationDropdown";
import API_BASE_URL from "../../config";
import ProductModal from "./ProductModal";
import StatisticsCard from "./StatisticsCard";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
import AddProductButton from "./AddProductButton";
import NotificationBell from "./NotificationBell";
import HeaderComponent from "./HeaderComponent";
import VendorNavbar from "./VendorNavbar";
import { AuthContext } from "../../Context/AuthContext";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [inStock, setInStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [ordersProcessed, setOrdersProcessed] = useState([]);
  const [averageRating, setAverageRating] = useState(4.5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`${API_BASE_URL}vendor/products/${user.id}`)
      .then((response) => {
        const products = response.data;
        const lowStock = products.filter(
          (product) => product.stockQuantity < 5 && product.stockQuantity > 0
        );
        const outOfStockProducts = products.filter(
          (product) => product.stockQuantity === 0
        );
        const totalStockQuantity = products.reduce(
          (acc, product) => acc + product.stockQuantity,
          0
        );

        setLowStockProducts(lowStock);
        setOutOfStock(outOfStockProducts.length);
        setInStock(products.length - outOfStockProducts.length);
        setTotalProducts(products.length);
        setTotalStock(totalStockQuantity);

        const totalRatings = products.reduce(
          (acc, product) => acc + (product.rating || 0),
          0
        );
        setAverageRating(totalRatings / products.length || 4.5);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      });

    axios
      .get(`${API_BASE_URL}vendor/products/my/order/all?vendorId=${user.id}`)
      .then((response) => {
        setOrdersProcessed(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  }, [user]);

  const handleAddProductClick = () => {
    navigate("/vendor/create");
  };

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Orders Processed",
        data: ordersProcessed.map((order) => order.count),
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
        data: [inStock, outOfStock, lowStockProducts.length],
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

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar role="vendor" />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <VendorNavbar />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <HeaderComponent title="Vendor Dashboard" />

          <div className="d-flex justify-content-between mb-4">
            <AddProductButton onClick={handleAddProductClick} />
            <NotificationBell
              lowStockProducts={lowStockProducts}
              showNotifications={showNotifications}
              handleBellClick={handleBellClick}
              handleProductClick={handleProductClick}
              setShowNotifications={setShowNotifications}
            />
          </div>

          {selectedProduct && (
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="custom-modal-size custom-modal-position"
            >
              <ProductModal product={selectedProduct} />
            </Modal>
          )}

          <Row className="mb-4">
            <StatisticsCard
              icon="FaBoxOpen"
              color="text-primary"
              count={totalProducts}
              label="Products Listed"
              footer="Update Now"
            />
            <StatisticsCard
              icon="FaWarehouse"
              color="text-warning"
              count={totalStock}
              label="Total Stock"
              footer="Update Now"
            />
            <StatisticsCard
              icon="FaClipboardList"
              color="text-success"
              count={ordersProcessed.length}
              label="Orders Processed"
              footer="Last Month"
            />
            <StatisticsCard
              icon="FaStar"
              color="text-danger"
              count={averageRating.toFixed(1)}
              label="Average Rating"
              footer="Update Now"
            />
          </Row>

          <Row>
            <Col lg={8}>
              <LineChartComponent data={lineData} />
            </Col>
            <Col lg={4}>
              <PieChartComponent data={pieData} />
            </Col>
          </Row>

          <ToastContainer autoClose={3000} />
        </Container>
      </div>

      <style jsx>{`
        .custom-modal-size {
          max-width: 900px;
        }

        .custom-modal-position {
          transform: translate(0, 10%);
        }

        .stat-card {
          transition: transform 0.3s ease-in-out;
        }

        .stat-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;

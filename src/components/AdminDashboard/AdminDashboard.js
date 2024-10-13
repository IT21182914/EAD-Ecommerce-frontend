/**
 * AdminDashboard.js
 *
 * This component renders the Admin Dashboard for the e-commerce application.
 * It displays statistics about orders, available products, and users (Admins, CSRs, Customers, and Vendors).
 * The dashboard includes the following features:
 *
 * - A line chart showing the behavior of orders over the week (Placed Orders, Issues Arised, Solved Issues).
 * - A pie chart representing order statistics (Pending, Delivered, Partially Delivered, Canceled).
 * - Stat cards showing the available product count, total revenue (20% of total revenue), and the number of users.
 *
 * Author: Herath R P N M
 * Registration Number: IT21177828
 * Date: 2024-10-08
 */

import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./AdminSidebar";
import {
  FaChartLine,
  FaDollarSign,
  FaHeart,
  FaUser,
  FaUserAltSlash,
  FaUserFriends,
  FaUserSecret,
} from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import NotificationBell from "./NotificationBell";
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config";

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
import AdminNavBar from "./AdminNavBar";
import {
  FaRegUser,
  FaShop,
  FaUserAstronaut,
  FaUserShield,
} from "react-icons/fa6";

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

const AdminDashboard = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [details, setDetails] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [stats, setStats] = useState([]);
  const [product, setProduct] = useState([]);
  const [behaviour, setBehaviour] = useState([]);

  console.log(user);
  console.log(loading);
  console.log(stats);

  // Data for Line Chart (Users Behavior)
  const lineData = {
    labels: behaviour.days,
    datasets: [
      {
        label: "Placed Order",
        data: behaviour.orders,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Issues arised",
        data: behaviour.issues,
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Solved Issues",
        data: behaviour.resolved,
        borderColor: "rgba(255,206,86,1)",
        fill: false,
      },
    ],
  };

  // Data for Pie Chart (Email Statistics)
  const pieData = {
    labels: ["Pending", "Delivered", "Partially Delivered", "Canceled"],
    datasets: [
      {
        label: "Order Statistics",
        data: [
          stats.PENDING,
          stats.DELIVERED,
          stats.PARTIALY_DELIVERED,
          stats.CANCELED,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  //Function for fetch all needed data from the API
  async function fetchData() {
    try {
      axios
        .get(`${API_BASE_URL}Dashboard/available/user/count`)
        .then((response) => {
          console.log(response.data);
          setDetails(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${API_BASE_URL}Dashboard/total/revanue`)
        .then((response) => {
          console.log(response.data);
          setRevenue(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${API_BASE_URL}Dashboard/order/stats`)
        .then((response) => {
          console.log(response.data);
          setStats(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${API_BASE_URL}Dashboard/available/product/count`)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${API_BASE_URL}Dashboard/order/behaviour`)
        .then((response) => {
          console.log(response.data);
          setBehaviour(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  //Fetch data when the page is loaded
  useEffect(() => {
    fetchData();
  }, [refresh]);

  //Function to calculate the profit
  function getProfit() {
    let amount = parseFloat(revenue);
    amount = (amount * 20) / 100;
    amount = amount.toFixed(2);
    return amount;
  }
  console.log(details);

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 d-flex justify-content-center">
              <h2
                className="mb-4"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(91, 33, 182, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin Dashboard
              </h2>
            </div>
          </div>

          {/* Stat Cards with explicit margin */}
          <Row className="mb-4">
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center">
                  <FaChartLine size={30} className="text-warning" />
                  <h3 className="my-2">{product ?? "N / A"}</h3>
                  <p>Products</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Available Product count</small>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center">
                  <FaDollarSign size={30} className="text-success" />
                  <h3 className="my-2">$ {getProfit()}</h3>
                  <p>Total Revenue</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>20% of Total Revenue</small>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center d-flex flex-row justify-content-center gap-4">
                  <div>
                    <FaUserSecret size={30} className="text-primary" />
                    <h3 className="my-2">{details?.Admin}</h3>
                    Admin
                  </div>
                  <div>
                    <FaUserShield size={30} className="text-primary" />
                    <h3 className="my-2">{details?.CSR}</h3>
                    CSR
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Staff</small>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center d-flex flex-row justify-content-center gap-4">
                  <div>
                    <FaUserFriends size={30} className="text-primary" />
                    <h3 className="my-2">{details?.Customer}</h3>
                    Customers
                  </div>
                  <div>
                    <FaShop size={30} className="text-primary" />
                    <h3 className="my-2">{details?.Vendor}</h3>
                    Vendors
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Users</small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          {/* Chart Section */}
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Behavior of orders</Card.Title>
                  <p>This week Behaviour</p>
                  <Line
                    data={lineData}
                    options={{
                      responsive: true,
                      animation: { duration: 1000 },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Order Statistics</Card.Title>
                  <p>Full spcification</p>
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      animation: { duration: 1000 },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;

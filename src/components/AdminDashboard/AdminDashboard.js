import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./AdminSidebar";
import { FaChartLine, FaDollarSign, FaHeart } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import NotificationBell from "./NotificationBell"; // Import NotificationBell
import { AuthContext } from "../../Context/AuthContext";

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
  const [notifications, setNotifications] = useState([]);

  console.log(user);
  console.log(loading);
  // Data for Line Chart (Users Behavior)
  const lineData = {
    labels: [
      "9:00AM",
      "12:00PM",
      "3:00PM",
      "6:00PM",
      "9:00PM",
      "12:00AM",
      "3:00AM",
      "6:00AM",
    ],
    datasets: [
      {
        label: "Open",
        data: [120, 200, 250, 300, 350, 400, 420, 450],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Click",
        data: [80, 150, 200, 240, 290, 350, 370, 390],
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Click Second Time",
        data: [60, 100, 140, 190, 250, 300, 320, 330],
        borderColor: "rgba(255,206,86,1)",
        fill: false,
      },
    ],
  };

  // Data for Pie Chart (Email Statistics)
  const pieData = {
    labels: ["Open", "Bounce", "Unsubscribe"],
    datasets: [
      {
        label: "Email Statistics",
        data: [40, 20, 40],
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
    // Simulating an API call with dummy data for orders
    // axios
    //   .get(`https://localhost:44321/api/v1/Order/all`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setOrders(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Simulating an API call to get notifications
    axios
      .get("https://localhost:44321/api/v1/Notification/my/notifications")
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
      });
  }, [refresh]);

  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar notification={[]} />
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
                  <h3 className="my-2">150GB</h3>
                  <p>Number</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Update Now</small>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center">
                  <FaDollarSign size={30} className="text-success" />
                  <h3 className="my-2">$1,345</h3>
                  <p>Revenue</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Last Day</small>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center">
                  <FaHeart size={30} className="text-primary" />
                  <h3 className="my-2">+45K</h3>
                  <p>Followers</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small>Update Now</small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          {/* Chart Section */}
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Users Behavior</Card.Title>
                  <p>24 Hours Performance</p>
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
                  <Card.Title>Email Statistics</Card.Title>
                  <p>Last Campaign Performance</p>
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

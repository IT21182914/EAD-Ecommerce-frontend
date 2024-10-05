import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./AdminSidebar";
import { FaChartLine, FaDollarSign, FaHeart } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import NotificationBell from "./NotificationBell"; // Import NotificationBell
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

  const [notifications] = useState([
    {
      id: 1,
      name: "System",
      message: "New order received",
      time: "Just now",
      isNew: true,
    },
    {
      id: 2,
      name: "System",
      message: "Order shipped",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: 3,
      name: "Admin",
      message: "Server restarted",
      time: "Yesterday",
      isNew: false,
    },
  ]);

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
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

          {/* Notification Bell */}
          <NotificationBell notifications={notifications} />
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
                  options={{ responsive: true, animation: { duration: 1000 } }}
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
                  options={{ responsive: true, animation: { duration: 1000 } }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;

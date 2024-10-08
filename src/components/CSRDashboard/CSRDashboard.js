import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./CSRSidebar";
import { FaUser, FaClipboardList, FaCommentDots, FaBan } from "react-icons/fa";
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
import AdminNavBar from "../AdminDashboard/AdminNavBar";

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

const CSRDashboard = () => {
  // Data for Line Chart (Order Cancellations)
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Cancellations",
        data: [30, 50, 40, 60, 55],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  // Data for Pie Chart (Customer Issues Resolved)
  const pieData = {
    labels: ["Resolved", "Pending", "Escalated"],
    datasets: [
      {
        label: "Customer Issues",
        data: [70, 20, 10],
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
        <h2
          className="mb-4 text-center"
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            background:
              "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(124, 58, 237, 1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
          }}
        >
          CSR Dashboard
          <div
            style={{
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "2px",
            }}
          ></div>
        </h2>

        {/* Stat Cards */}
        <Row className="mb-4">
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaUser size={30} className="text-primary" />
                <h3 className="my-2">200</h3>
                <p>Accounts Managed</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Last Updated</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={30} className="text-warning" />
                <h3 className="my-2">150</h3>
                <p>Orders Managed</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Last Month</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaCommentDots size={30} className="text-success" />
                <h3 className="my-2">100</h3>
                <p>Customer Inquiries</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Last Week</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <FaBan size={30} className="text-danger" />
                <h3 className="my-2">50</h3>
                <p>Cancellations Processed</p>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>Last Month</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        {/* Chart Section */}
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Order Cancellations</Card.Title>
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
                <Card.Title>Customer Issues</Card.Title>
                <p>Issue Resolution</p>
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
    </div>
  );
};

export default CSRDashboard;

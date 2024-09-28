import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./VendorSidebar";
import {
  FaBoxOpen,
  FaWarehouse,
  FaClipboardList,
  FaStar,
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

  return (
    <div className="d-flex">
      <Sidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2
          className="mb-4 text-center"
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
          <div
            style={{
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              backgroundColor: "#22C1C3",
              borderRadius: "2px",
            }}
          ></div>
        </h2>

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
      </Container>
    </div>
  );
};

export default VendorDashboard;

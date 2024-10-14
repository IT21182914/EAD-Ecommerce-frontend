import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./CSRSidebar";
// import { FaUser, FaClipboardList, FaCommentDots, FaBan } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import API_BASE_URL from "../../config";
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
import {
  FaChartLine,
  FaDollarSign,
  FaHeart,
  FaUser,
  FaUserAltSlash,
  FaUserFriends,
  FaUserSecret,
} from "react-icons/fa";
import {
  FaRegUser,
  FaShop,
  FaUserAstronaut,
  FaUserShield,
} from "react-icons/fa6";
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
  const { user, loading, logout } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [details, setDetails] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [stats, setStats] = useState([]);
  const [product, setProduct] = useState([]);
  const [behaviour, setBehaviour] = useState([]);
  // Data for Line Chart (Order Cancellations)
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
        {/* <Row className="mb-4">
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
        </Row> */}

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
                  {/* <div>
                    <FaUserSecret size={30} className="text-primary" />
                    <h3 className="my-2">{details?.Admin}</h3>
                    Admin
                  </div> */}
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

export default CSRDashboard;

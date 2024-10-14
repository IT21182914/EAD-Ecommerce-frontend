import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import VendorSidebar from "./VendorSidebar";
import VendorNavbar from "./VendorNavbar";
import FeedbackCard from "./FeedbackCard";
import { AuthContext } from "../../Context/AuthContext";
import API_BASE_URL from "../../config";

const Feedback = () => {
  const { user } = useContext(AuthContext);
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (!user?.id) {
          setError("User ID is missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}Feedback/product/feedback/{productId}`
        );
        setFeedbackData(response.data.user.result);
      } catch (error) {
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [user]);

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />

      <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
        <VendorNavbar />

        <Container fluid className="p-4">
          <h2
            className="text-center my-4"
            style={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              color: "#333",
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Vendor Feedback
          </h2>

          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : (
            <Row className="justify-content-center">
              <Col lg={6}>
                <FeedbackCard feedback={feedbackData} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Feedback;

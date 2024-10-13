/**
 * ManageProducts.js
 *
 * This component allows the admin to manage vendor products in the e-commerce system.
 * It includes functionalities for searching products by vendor ID,
 * displaying a list of products in a table format, and providing options to activate
 * or deactivate products. The component integrates with a backend API to fetch
 * product details and perform updates.
 *
 * Key Features:
 * - Fetches all products for the vendor from the API on component mount and when refreshed.
 * - Displays products in a responsive table with filtering options.
 * - Provides modals for confirming activation and deactivation of products.
 * - Uses react-bootstrap for UI components and react-toastify for notifications.
 *
 * State Management:
 * - details: Array to hold product details fetched from the API.
 * - loading: Boolean to indicate loading state while fetching products.
 * - isLoading: Boolean to indicate loading state during activation/deactivation actions.
 * - searchTerm: String for filtering products based on vendor ID.
 * - showActivateModal / showDeactivateModal: Booleans to control visibility of modals.
 * - selectedOrder: Object to hold the currently selected product for activation/deactivation.
 * - error: String to hold any error messages.
 * - refresh: Boolean to trigger re-fetching of product details.
 *
 * API Integration:
 * - Axios is used to make HTTP requests to the API endpoints for retrieving product
 * details and updating their activation status.
 *
 *
 * Dependencies:
 * - React
 * - React-Bootstrap
 * - React-Icons
 * - React-Toastify
 * - Axios
 *
 * Author: Herath R P N M
 * Registration Number: IT21177828
 * Date: 2024-10-08
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  FormControl,
  InputGroup,
  Spinner,
  Badge,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import Sidebar from "./AdminSidebar";
import API_BASE_URL from "../../config";

export default function ManageProducts() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  // Simulating an API call with dummy data for details
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}vendor/products/all`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load products");
        setLoading(false);
        console.log(error);
      });
  }, [refresh]);

  // Handle activation and deactivation actions
  const handleAction = (order, action) => {
    if (action === "Activate") {
      setSelectedOrder(order);
      setShowActivateModal(true);
    } else if (action === "Deactivate") {
      setSelectedOrder(order);
      setShowDeactivateModal(true);
    }
  };

  // Activate or Deactivate product
  const activateProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let message = "";
    if (selectedOrder.isActive === false) {
      message = "Activated";
    } else {
      message = "Deactivated";
    }
    // Perform API call to cancel order
    console.log("activateProduct", selectedOrder.productId);
    setError("");
    axios
      .put(
        `${API_BASE_URL}vendor/products/activate/${selectedOrder?.productId}`
      )
      .then((response) => {
        console.log(response.data);
        toast.success(`Product ${message} successfully`);
        setShowActivateModal(false);
        setShowDeactivateModal(false);
        setIsLoading(false);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to Activate Product");
        setIsLoading(false);
      });
  };

  // Filter products based on search term
  const filteredOrders = details.filter((order) =>
    order.vendorId
      ? order.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
      : ""
  );

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
                Manage Products
              </h2>
            </div>
          </div>
          {/* Search Bar */}
          <div className="text-center mb-4">
            <InputGroup
              className="search-bar-wrapper"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <FormControl
                type="search"
                placeholder="Search by Customer ID"
                value={searchTerm}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchTerm(e.target.value);
                }}
                style={{
                  borderRadius: "30px 0 0 30px",
                  padding: "10px 20px",
                  border: "2px solid #ddd",
                }}
              />
              <Button
                variant="dark"
                style={{ borderRadius: "0 30px 30px 0", padding: "10px 15px" }}
              >
                <FaSearch />
              </Button>
            </InputGroup>
          </div>

          {/* Orders Table */}
          {loading ? (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              ></Spinner>
            </div>
          ) : (
            <Table
              striped
              bordered
              hover
              className="shadow-sm"
              style={{ fontSize: "0.9rem" }}
            >
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Vendor ID</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Stock QTY</th>
                  <th>Stock Status</th>
                  <th>UpdatedAt</th>
                  <th>CreatedAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.vendorId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <Badge
                        className="p-2"
                        pill
                        bg={product.isActive == true ? "success" : "danger"}
                      >
                        {product.isActive == true ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td>{product.stockQuantity}</td>
                    <td>
                      <Badge
                        className="p-2"
                        pill
                        bg={
                          product.stockStatus === "OutOfStock"
                            ? "danger"
                            : product.stockStatus === "Available"
                            ? "success"
                            : product.stockStatus === "PENDING"
                            ? "primary"
                            : product.stockStatus === "PARTIALY-DELIVERED"
                            ? "secondary"
                            : "warning"
                        }
                      >
                        {product.stockStatus}
                      </Badge>
                    </td>
                    <td>{product.createdAt}</td>
                    <td>{product.updatedAt}</td>
                    <td>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Action"
                        variant="outline-secondary"
                        size="sm"
                      >
                        <Dropdown.Item
                          onClick={() => handleAction(product, "Activate")}
                          disabled={product.isActive === true ? true : false}
                        >
                          Activate
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAction(product, "Deactivate")}
                          disabled={product.isActive === true ? false : true}
                        >
                          Deactivate
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Cancel Confirmation Modal */}
          <Modal
            show={showActivateModal}
            onHide={() => {
              setShowActivateModal(false);
              setError("");
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Activation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="cancelNote">
                {error ? (
                  <Form.Label style={{ color: "red" }}>{error}</Form.Label>
                ) : (
                  <Form.Label>
                    Please confirm{" "}
                    <span className="text-success fw-bold">Activation</span> of
                    product : <br />
                    <b>Product Name: </b>
                    {selectedOrder?.name} <br />
                    <b>Product ID : </b> {selectedOrder?.productId}
                  </Form.Label>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowActivateModal(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="success"
                onClick={activateProduct}
                disabled={isLoading}
              >
                Confirm Activation
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDeactivateModal}
            onHide={() => {
              setShowDeactivateModal(false);
              setError("");
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Deliver Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="cancelNote">
                {error ? (
                  <Form.Label style={{ color: "red" }}>{error}</Form.Label>
                ) : (
                  <Form.Label>
                    Please confirm{" "}
                    <span className="text-danger fw-bold">Deactivation</span> of
                    product : <br />
                    <b>Product Name: </b>
                    {selectedOrder?.name} <br />
                    <b>Product ID : </b> {selectedOrder?.productId}
                  </Form.Label>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeactivateModal(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="danger"
                onClick={activateProduct}
                disabled={isLoading}
              >
                Confirm Deactivation
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer autoClose={3000} hideProgressBar={false} />
        </Container>
      </div>
    </div>
  );
}

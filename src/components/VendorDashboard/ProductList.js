import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorSidebar from "./VendorSidebar";
import AdminNavBar from "../AdminDashboard/AdminNavBar";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import API_BASE_URL from "../../config";
import VendorNavbar from "./VendorNavbar";
import { AuthContext } from "../../Context/AuthContext";

const ProductList = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}vendor/products/${user.id}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, [vendorId]);

  const deleteProduct = (productId) => {
    setLoading(true);
    axios
      .delete(`${API_BASE_URL}vendor/products/delete/${productId}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
        toast.warning("Product deleted successfully");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to delete product");
        setLoading(false);
      });
    setShowConfirmModal(false);
  };

  const handleEdit = (productId) => {
    navigate(`/vendor/update/${productId}`);
  };

  const handleShowConfirmModal = (product) => {
    setProductToDelete(product);
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmModal(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="d-flex animated-page">
      <VendorSidebar role="vendor" />
      <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
        <VendorNavbar />

        <Container fluid className="p-4">
          <h2
            className="text-center my-4 animated-header"
            style={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              color: "#333",
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Products
          </h2>

          {/* Search bar */}
          <div className="text-center mb-4" style={{ position: "relative" }}>
            <InputGroup
              className="search-bar-wrapper"
              style={{
                justifyContent: "center",
                maxWidth: "300px",
                margin: "0 auto",
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "30px 0 0 30px",
                  padding: "10px 20px",
                  border: "2px solid #ddd",
                  backgroundColor: "#f8f9fa",
                  color: "#333",
                }}
              />
              <div
                className="btn btn-primary"
                style={{
                  borderRadius: "0 30px 30px 0",
                  backgroundColor: "black",
                  border: "none",
                  padding: "10px 15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaSearch />
              </div>
            </InputGroup>

            {showDropdown && filteredProducts.length > 0 && (
              <Dropdown.Menu
                show
                align="end"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  maxWidth: "300px",
                  width: "100%",
                  margin: "10px auto",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  zIndex: 1000,
                  padding: "10px 0",
                  transition: "all 0.3s ease",
                }}
              >
                {filteredProducts.map((product) => (
                  <Dropdown.Item
                    key={product.productId}
                    onClick={() => {
                      setSearchTerm(product.name);
                      setShowDropdown(false);
                    }}
                    style={{
                      padding: "12px 20px",
                      color: "#333",
                      fontWeight: "500",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#f8f9fa";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    <span>{product.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                className="animated-spinner"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="sr-only"></span>
              </Spinner>
            </div>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col
                  key={product.productId}
                  md={3}
                  sm={6}
                  xs={12}
                  className="mb-4 animated-product"
                >
                  <ProductCard
                    product={product}
                    handleEdit={handleEdit}
                    deleteProduct={() => handleShowConfirmModal(product)}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            show={showConfirmModal}
            handleClose={handleCancelDelete}
            handleConfirm={() => deleteProduct(productToDelete.productId)}
            productName={productToDelete?.name}
          />

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

      <style jsx>{`
        .animated-page {
          animation: fadeInPage 1s ease-in-out;
        }

        .animated-header {
          animation: fadeInDown 1s ease;
        }

        .animated-spinner {
          animation: rotateSpinner 1.5s linear infinite;
        }

        .animated-product {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animated-product:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateSpinner {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInPage {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;

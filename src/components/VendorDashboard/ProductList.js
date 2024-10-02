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
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard"; // Import the new ProductCard component

const ProductList = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // To show/hide product names
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vendor products from the backend
    axios
      .get(`https://localhost:44321/api/v1/vendor/products/all`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Turn off the spinner after data is fetched
      })
      .catch((error) => {
        toast.error("Failed to load products");
        setLoading(false); // Turn off the spinner even if there's an error
      });
  }, [vendorId]);

  const deleteProduct = (productId) => {
    setLoading(true); // Start loading spinner for delete operation
    axios
      .delete(
        `https://localhost:44321/api/v1/vendor/products/delete/${productId}`
      )
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
        toast.success("Product deleted successfully");
        setLoading(false); // Stop loading spinner after deletion
      })
      .catch((error) => {
        toast.error("Failed to delete product");
        setLoading(false); // Stop loading spinner if error
      });
  };

  const handleEdit = (productId) => {
    navigate(`/vendor/update/${productId}`);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        {/* Stylish "Products" text */}
        <h2
          className="text-center my-4"
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "#333",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Products
        </h2>

        {/* Enhanced search bar with dropdown */}
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
                className="mb-4"
              >
                <ProductCard
                  product={product}
                  handleEdit={handleEdit}
                  deleteProduct={deleteProduct}
                />
              </Col>
            ))}
          </Row>
        )}

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
  );
};

export default ProductList;

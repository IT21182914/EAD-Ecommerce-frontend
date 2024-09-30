import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

const ManageInventory = () => {
  const { vendorId } = useParams(); // Assuming vendorId is part of the route
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:44321/api/v1/vendor/products/${vendorId}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, [vendorId]);

  const updateStock = (productId, stockQuantity) => {
    axios
      .put(
        `https://localhost:44321/api/v1/vendor/products/update/${productId}`,
        { stockQuantity }
      )
      .then(() => {
        setProducts(
          products.map((product) =>
            product.productId === productId
              ? { ...product, stockQuantity }
              : product
          )
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="text-center my-4">Manage Inventory</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.name}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() =>
                      updateStock(product.productId, product.stockQuantity + 1)
                    }
                  >
                    +1
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      updateStock(product.productId, product.stockQuantity - 1)
                    }
                  >
                    -1
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManageInventory;

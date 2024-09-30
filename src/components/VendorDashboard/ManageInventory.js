import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const ManageInventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/vendor/products/{vendorId}")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const updateStock = (productId, stockQuantity) => {
    axios
      .put(`/api/v1/vendor/products/update/${productId}`, { stockQuantity })
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
    <Container>
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
                  onClick={() =>
                    updateStock(product.productId, product.stockQuantity + 1)
                  }
                >
                  +1
                </Button>
                <Button
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
  );
};

export default ManageInventory;

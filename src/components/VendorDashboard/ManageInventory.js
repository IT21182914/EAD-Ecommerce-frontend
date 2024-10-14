import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  FormControl,
  InputGroup,
  Button,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import VendorSidebar from "./VendorSidebar";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config.js";
import VendorNavbar from "./VendorNavbar.js";
import { AuthContext } from "../../Context/AuthContext";

const ManageInventory = () => {
  const { user } = React.useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, []);

  const handleEdit = (productId) => {
    navigate(`/vendor/update/${productId}`);
  };

  const totalStockQuantity = products.reduce(
    (total, product) => total + product.stockQuantity,
    0
  );

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Button
            size="sm"
            onClick={() => handleEdit(row.original.productId)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#007bff";
            }}
          >
            {row.original.name}
          </Button>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ value }) => (
          <span
            style={{
              color: value === "LowStock" ? "red" : "inherit",
              fontWeight: value === "LowStock" ? "bold" : "normal",
            }}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Product Status",
        accessor: "isActive",
        Cell: ({ value }) => (
          <Button
            size="sm"
            style={{
              backgroundColor: value ? "#4CAF50" : "#FF5252",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "5px 15px",
              cursor: "default",
            }}
          >
            {value ? "Active" : "Inactive"}
          </Button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable({ columns, data: products }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  useEffect(() => {
    setGlobalFilter(searchTerm);
  }, [searchTerm, setGlobalFilter]);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <VendorSidebar role="vendor" />
      <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
        <VendorNavbar />

        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="heading-container">
            <h2 className="heading-style">Manage Inventory</h2>
          </div>

          <style jsx>{`
            .heading-container {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              margin: 20px 0;
            }

            .heading-style {
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              font-weight: 800;
              padding: 20px 40px;
              border-radius: 12px;
              text-align: center;
              font-size: 2rem;
              font-family: "Poppins", sans-serif;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
              letter-spacing: 1px;
              text-transform: uppercase;
              transition: transform 0.3s ease;
            }

            .heading-style:hover {
              transform: scale(1.05);
            }
          `}</style>

          {/* Search Bar */}
          <div className="text-center mb-4" style={{ position: "relative" }}>
            <InputGroup
              className="search-bar-wrapper"
              style={{
                justifyContent: "center",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "30px 0 0 30px",
                  padding: "10px 20px",
                  border: "2px solid #ddd",
                }}
              />
              <div
                className="btn btn-dark"
                style={{
                  borderRadius: "0 30px 30px 0",
                  backgroundColor: "black",
                  border: "none",
                  padding: "10px 15px",
                }}
              >
                <FaSearch />
              </div>
            </InputGroup>
          </div>

          {/* Responsive Table */}
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
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                {...getTableProps()}
                className="shadow-sm animated-table"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FaSortDown />
                              ) : (
                                <FaSortUp />
                              )
                            ) : (
                              <FaSort />
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        style={{
                          backgroundColor:
                            row.original.stockStatus === "LowStock"
                              ? "#ffefef"
                              : "inherit",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          {/* Total Stock Quantity Box */}
          {!loading && (
            <div className="d-flex justify-content-center mt-5">
              <Card
                style={{
                  width: "250px",
                  padding: "20px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #9f44d3, #6a11cb)",
                  color: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4>Total Stock Quantity</h4>
                <h3>{totalStockQuantity}</h3>
              </Card>
            </div>
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
        <style jsx>{`
          .animated-table tr:hover {
            transform: scale(1.01);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          @media (max-width: 768px) {
            th,
            td {
              white-space: nowrap;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ManageInventory;

import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  FormControl,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import VendorSidebar from "./VendorSidebar";

const ManageInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch product data from the API
    axios
      .get("https://localhost:44321/api/v1/vendor/products/all")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
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
    ],
    []
  );

  // Table Instance
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
    setGlobalFilter(searchTerm); // Apply search term to the table filtering
  }, [searchTerm, setGlobalFilter]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner
          animation="border"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <VendorSidebar role="vendor" />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="text-center my-4 text-primary display-4">
          Manage Inventory
        </h2>

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

        {/* Table */}
        <Table
          striped
          bordered
          hover
          responsive
          {...getTableProps()}
          className="shadow-sm animated-table"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>

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
      `}</style>
    </div>
  );
};

export default ManageInventory;

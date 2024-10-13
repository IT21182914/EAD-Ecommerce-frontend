/**
 * AccountActivation.js
 * 
 * This component is responsible for displaying and managing the activation 
 * status of user accounts in the e-commerce application. It fetches the list 
 * of users from the server, allows the admin to activate or 
 * deactivate accounts accordingly. 
 * 
 * Features:
 * - Fetches inactive users from the API on component mount.
 * - Displays user details in a sortable table format.
 * - Provides buttons to activate or deactivate user accounts.
 * - Uses toast notifications to inform the admin of actions taken.
 * 
 * Dependencies:
 * - React
 * - react-bootstrap
 * - react-icons
 * - react-toastify
 * - react-table
 * - axios
 * 
 * Author: Herath R P N M
 * Registration Number: IT21177828
 * Date: 2024-10-08
 * 
 * This component enhances user management by providing an intuitive 
 * interface for handling account activation and deactivation.
 */

import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import CSRSidebar from "./AdminSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import API_BASE_URL from "../../config";
import Sidebar from "./AdminSidebar";
import AdminNavBar from "./AdminNavBar";

const AccountActivation = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_BASE_URL}get-Inactive-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("This is inactive response");
        console.log(response);
        setCustomers(response.data);
      } catch (err) {
        console.log("Error fectiching inactive users: ", err);
      }
    };

    fetchData();
  }, []);

  // Toggle Activation Status
  const handleToggle = async (customerID) => {
    // Update the state optimistically for a better UX
    const updatedCustomers = customers.map((customer) =>
      customer.id === customerID
        ? { ...customer, isActive: !customer.isActive }
        : customer
    );
    setCustomers(updatedCustomers);

    // Find the updated customer and display a toast message
    const updatedCustomer = updatedCustomers.find(
      (customer) => customer.id === customerID
    );

    if (!updatedCustomer) {
      console.error("Customer not found");
      return;
    }

    try {
      console.log("this is cus id");
      console.log(updatedCustomer.isActive);
      const url = updatedCustomer.isActive
        ? `${API_BASE_URL}activate-customer/${customerID}`
        : `${API_BASE_URL}deactivate-user/${customerID}`;

      console.log(url);
      const token = localStorage.getItem("accessToken");
      console.log("This is tokn access");
      console.log(token);
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (updatedCustomer.isActive) {
          console.log(response);
          toast.success(`${updatedCustomer.name} activated succesfully`);
        } else {
          console.log(response);
          toast.warning(`${updatedCustomer.name} deactivation successfully`);
        }
      } else {
        throw new console.Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating activation status:", error);
      toast.error(`Failed to update ${updatedCustomer.name}'s status.`);
    }
  };

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Customer ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "firstName",
      },
      {
        Header: "User Role",
        accessor: "role",
        Cell: ({ value }) => {
          const roleMapping = {
            1: "Admin",
            2: "Customer",
            3: "CSR",
            4: "Vendor",
          };

          return roleMapping[value] || "Unknown";
        },
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Telephone",
        accessor: "phoneNumber",
      },
      {
        Header: "Action",
        accessor: "isActive",
        Cell: ({ row }) => (
          <Button
            onClick={() => handleToggle(row.original.id)}
            style={{
              backgroundColor: row.original.isActive ? "#dc3545" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = row.original.isActive
                ? "#c82333"
                : "#0056b3";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = row.original.isActive
                ? "#dc3545"
                : "#007bff";
            }}
          >
            {row.original.isActive ? "Deactivate" : "Activate"}
          </Button>
        ),
      },
    ],
    [customers]
  );

  // Table Instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: customers }, useSortBy);

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
                Account Activation
              </h2>
            </div>
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
              display: inline-block;
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
                        backgroundColor: row.original.isActive
                          ? "#e6ffed"
                          : "#ffe6e6",
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
          </div>
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

export default AccountActivation;
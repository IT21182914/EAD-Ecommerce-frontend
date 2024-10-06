import React, { useEffect,useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import CSRSidebar from "./CSRSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import API_BASE_URL from "../../config";
const CSRAccountActivation = () => {
  const [customers, setCustomers] = useState([

    // {
    //   customerID: 1,
    //   name: "John Doe",
    //   email: "john@example.com",
    //   telephone: "123-456-7890",
    //   isActive: false,
    // },
    // {
    //   customerID: 2,
    //   name: "Jane Smith",
    //   email: "jane@example.com",
    //   telephone: "987-654-3210",
    //   isActive: true,
    // },
    // {
    //   customerID: 3,
    //   name: "Sam Wilson",
    //   email: "sam@example.com",
    //   telephone: "555-123-4567",
    //   isActive: false,
    // },
  ]);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get(
          `${API_BASE_URL}get-Inactive-users` , {
            headers:{
              Authorization: `Bearer hi this is token`,
              'Content-Type' : 'application/json'
            }
          }
        );
        console.log("This is inactive response")
        console.log(response)
        setCustomers(response.data)
      }catch(err){
          console.log("Error fectiching inactive users: " ,err)
      }
    }

    fetchData()
  },[])

  

  // Toggle Activation Status
  const handleToggle = async (customerID) => {
    var userID 
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

    try{
      console.log("this is cus id")
      console.log(customerID)
       userID = customerID
      console.log(userID)
      const url = updatedCustomer.isActive
      ? `${API_BASE_URL}deactivate-user/${userID}`
      : `${API_BASE_URL}activate-customer/${userID}`;

      console.log(url)
      const response = await axios.patch(
        // `${API_BASE_URL}activate-customer/${customerID}`,
        url,
        // {},
        {
          headers:{
            Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXRoaXlhQGdtYWlsLmNvbSIsImp0aSI6ImVkODYwMjVkLTJjYTItNDZiNC04ZjIzLWI1ZTgyMjFjMjNmZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJCYXRoaXlhIFBhdGh1bSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzI4MjE0OTAxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMyMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzIxIn0.b_g3cjPAIVfEkCPX6IISDpGtBC1IkRhBVcX5Ueh9na8`,
            'Content-Type' : 'application/json'
          },
        }
      );

      if(response.status === 200){
        if(updatedCustomer.isActive){
          console.log(response)
          toast.success(`${updatedCustomer.name} activated succesfully`)
        }else{
          console.log(response)
          toast.warning(`${updatedCustomer.name} deactivation successfully`)
        }
      }else{
        throw new console.Error("Failed to update status");       
      }
    }catch(error){
      console.error("Error updating activation status:", error);
      toast.error(`Failed to update ${updatedCustomer.name}'s status.`);
    }

    // if (updatedCustomer.isActive) {
    //   toast.success(`${updatedCustomer.name} activated successfully.`);
    // } else {
    //   toast.warning(`${updatedCustomer.name} deactivated successfully.`);
    // }
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
    <div className="d-flex">
      <CSRSidebar />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <div className="heading-container">
          <h2 className="heading-style">Customer Account Activation</h2>
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
  );
};

export default CSRAccountActivation;

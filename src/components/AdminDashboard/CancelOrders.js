import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulating an API call with dummy data
    const dummyOrders = [
      {
        orderID: "1",
        customerID: "C001",
        status: "Pending",
        address: "123 Main St, Cityville",
        tel: "+123456789",
        createdAt: "2024-10-01",
      },
      {
        orderID: "2",
        customerID: "C002",
        status: "Shipped",
        address: "456 Elm St, Townsville",
        tel: "+987654321",
        createdAt: "2024-09-29",
      },
      {
        orderID: "3",
        customerID: "C003",
        status: "Delivered",
        address: "789 Oak St, Villageburg",
        tel: "+192837465",
        createdAt: "2024-09-28",
      },
      {
        orderID: "4",
        customerID: "C004",
        status: "Cancelled",
        address: "321 Pine St, Hamletton",
        tel: "+564738291",
        createdAt: "2024-09-27",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === selectedOrder.orderID
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
    toast.success("Order cancelled successfully");
    setShowCancelModal(false);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerID
      ? order.customerID.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="d-flex">
      <AdminSidebar />
      <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
        <h2 className="text-center my-4">Manage Orders</h2>

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
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: "30px 0 0 30px",
                padding: "10px 20px",
                border: "2px solid #ddd",
              }}
            />
            <div
              className="btn btn-dark"
              style={{ borderRadius: "0 30px 30px 0", padding: "10px 15px" }}
            >
              <FaSearch />
            </div>
          </InputGroup>
        </div>

        {/* Orders Table */}
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
          <Table striped bordered hover className="shadow-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Address</th>
                <th>Tel</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.customerID}</td>
                  <td>{order.status}</td>
                  <td>{order.address}</td>
                  <td>{order.tel}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleCancel(order)}
                      disabled={order.status === "Cancelled"}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Cancellation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Yes, Cancel Order
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer autoClose={3000} hideProgressBar={false} />
      </Container>
    </div>
  );
};

export default CancelOrders;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Modal,
//   FormControl,
//   InputGroup,
//   Spinner,
// } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";
// import AdminSidebar from "./AdminSidebar";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CancelOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     // Fetch orders from backend API
//     axios
//       .get("") // Replace with your API endpoint
//       .then((response) => {
//         setOrders(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error("Failed to load orders");
//         setLoading(false);
//       });
//   }, []);

//   const handleCancel = (order) => {
//     setSelectedOrder(order);
//     setShowCancelModal(true);
//   };

//   const confirmCancel = () => {
//     axios
//       .put(`https://api.example.com/orders/cancel/${selectedOrder.orderID}`) // Replace with your API endpoint
//       .then(() => {
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.orderID === selectedOrder.orderID
//               ? { ...order, status: "Cancelled" }
//               : order
//           )
//         );
//         toast.success("Order cancelled successfully");
//         setShowCancelModal(false);
//       })
//       .catch((error) => {
//         toast.error("Failed to cancel order");
//         setShowCancelModal(false);
//       });
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.customerID
//       ? order.customerID.toLowerCase().includes(searchTerm.toLowerCase())
//       : false
//   );

//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <Container fluid className="p-4" style={{ marginLeft: "240px" }}>
//         <h2 className="text-center my-4">Manage Orders</h2>

//         {/* Search Bar */}
//         <div className="text-center mb-4">
//           <InputGroup
//             className="search-bar-wrapper"
//             style={{ maxWidth: "400px", margin: "0 auto" }}
//           >
//             <FormControl
//               type="search"
//               placeholder="Search by Customer ID"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 borderRadius: "30px 0 0 30px",
//                 padding: "10px 20px",
//                 border: "2px solid #ddd",
//               }}
//             />
//             <div
//               className="btn btn-dark"
//               style={{ borderRadius: "0 30px 30px 0", padding: "10px 15px" }}
//             >
//               <FaSearch />
//             </div>
//           </InputGroup>
//         </div>

//         {/* Orders Table */}
//         {loading ? (
//           <div className="text-center my-5">
//             <Spinner
//               animation="border"
//               role="status"
//               style={{ width: "3rem", height: "3rem" }}
//             >
//               <span className="sr-only"></span>
//             </Spinner>
//           </div>
//         ) : (
//           <Table striped bordered hover className="shadow-sm">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer ID</th>
//                 <th>Status</th>
//                 <th>Address</th>
//                 <th>Tel</th>
//                 <th>Created At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order.orderID}>
//                   <td>{order.orderID}</td>
//                   <td>{order.customerID}</td>
//                   <td>{order.status}</td>
//                   <td>{order.address}</td>
//                   <td>{order.tel}</td>
//                   <td>{order.createdAt}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="danger"
//                       onClick={() => handleCancel(order)}
//                       disabled={order.status === "Cancelled"}
//                     >
//                       Cancel
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}

//         {/* Cancel Confirmation Modal */}
//         <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Cancellation</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Are you sure you want to cancel this order? This action cannot be
//             undone.
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="secondary"
//               onClick={() => setShowCancelModal(false)}
//             >
//               Close
//             </Button>
//             <Button variant="danger" onClick={confirmCancel}>
//               Yes, Cancel Order
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <ToastContainer autoClose={3000} hideProgressBar={false} />
//       </Container>
//     </div>
//   );
// };

// export default CancelOrders;

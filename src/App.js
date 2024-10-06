import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";
import ProductList from "./components/VendorDashboard/ProductList";
import CreateProduct from "./components/VendorDashboard/CreateProduct";
import UpdateProduct from "./components/VendorDashboard/UpdateProduct";
import ManageInventory from "./components/VendorDashboard/ManageInventory";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Orders from "./components/VendorDashboard/Orders";
import CSRDashboard from "./components/CSRDashboard/CSRDashboard";
import CancelOrders from "./components/AdminDashboard/CancelOrders";
import VendorCreation from "./components/AdminDashboard/VendorCreation";
import ChangePassword from "./components/CSRDashboard/ChangePassword";
import CSRAccountActivation from "./components/CSRDashboard/CSRAccountActivation";

function App() {
  return (
    <Router>
      <div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cancel/orders" element={<CancelOrders />} />
            <Route path="/create/vendor" element={<VendorCreation />} />

            <Route path="/csr/dashboard" element={<CSRDashboard />} />
            <Route path="/csr/changepassword" element={<ChangePassword />} />
            <Route path="/csr/activation" element={<CSRAccountActivation />} />

            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<ProductList />} />
            <Route path="/vendor/create" element={<CreateProduct />} />
            <Route
              path="/vendor/update/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/vendor/inventory" element={<ManageInventory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

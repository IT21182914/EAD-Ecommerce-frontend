import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";
import CSRDashboard from "./components/CSRDashboard/CSRDashboard";

function App() {
  return (
    <Router>
      <div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/csr-dashboard" element={<CSRDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

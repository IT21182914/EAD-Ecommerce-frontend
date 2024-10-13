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
import CSRAccountActivation from "./components/CSRDashboard/CSRAccountActivation";
import CancelOrders from "./components/AdminDashboard/CancelOrders";
import VendorCreation from "./components/AdminDashboard/VendorCreation";
import { AuthProvider } from "./Context/AuthContext";
import RoleBasedRoute from "./Routes/RoleBasedRoute";
import UnauthorizedPage from "./components/Unauthorized/Unauthorized";
import ActivateAccounts from "./components/AdminDashboard/ActivateAccounts";
import Notifications from "./components/AdminDashboard/Notifications";
import ManageProducts from "./components/AdminDashboard/ManageProducts";
import OrderCancellationRequest from "./components/AdminDashboard/OrderCancellationRequest";
import CreateUser from "./components/CSRDashboard/CreateUser";
import AccountActivation from "./components/AdminDashboard/AccountActivation";
import ActivateProducts from "./components/CSRDashboard/ActivateProducts";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <RoleBasedRoute
                    element={<AdminDashboard />}
                    allowedRoles={[1]}
                  />
                }
              />
              <Route
                path="/admin/create/vendor"
                element={
                  <RoleBasedRoute
                    element={<VendorCreation />}
                    allowedRoles={[1]}
                  />
                }
              />
              <Route
                path="/admin/manage/orders"
                element={
                  <RoleBasedRoute
                    element={<CancelOrders />}
                    allowedRoles={[1]}
                  />
                }
              />
              <Route
                path="/admin/manage/products"
                element={
                  <RoleBasedRoute
                    element={<ManageProducts />}
                    allowedRoles={[1]}
                  />
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <RoleBasedRoute
                    element={<Notifications />}
                    allowedRoles={[1]}
                  />
                }
              />
              <Route
                path="/admin/cancelations"
                element={
                  <RoleBasedRoute
                    element={<OrderCancellationRequest />}
                    allowedRoles={[1]}
                  />
                }
              />

              <Route
                path="/admin/account/activation"
                element={
                  <RoleBasedRoute
                    element={<AccountActivation />}
                    allowedRoles={[1]}
                  />
                }
              />

              {/* <Route
                path="/admin/product/activation"
                element={
                  <RoleBasedRoute
                    element={<ActivateProducts />}
                    allowedRoles={[1]}
                  />
                }
              /> */}

              {/* CSR Routes */}
              <Route
                path="/csr/dashboard"
                element={
                  <RoleBasedRoute
                    element={<CSRDashboard />}
                    allowedRoles={[3]}
                  />
                }
              />

              {/* CSR Routes */}
              <Route
                path="/csr/activation"
                element={
                  <RoleBasedRoute
                    element={<CSRAccountActivation />}
                    allowedRoles={[3]}
                  />
                }
              />
              <Route
                path="/csr/productactivation"
                element={
                  <RoleBasedRoute
                    element={<ActivateProducts />}
                    allowedRoles={[3]}
                  />
                }
              />
              <Route
                path="/csr/create/users"
                element={
                  <RoleBasedRoute element={<CreateUser />} allowedRoles={[3]} />
                }
              />

              {/* Vendor Routes */}
              <Route
                path="/vendor/dashboard"
                element={
                  <RoleBasedRoute
                    element={<VendorDashboard />}
                    allowedRoles={[4]}
                  />
                }
              />
              <Route
                path="/vendor/products"
                element={
                  <RoleBasedRoute
                    element={<ProductList />}
                    allowedRoles={[4]}
                  />
                }
              />
              <Route
                path="/vendor/create"
                element={
                  <RoleBasedRoute
                    element={<CreateProduct />}
                    allowedRoles={[4]}
                  />
                }
              />
              <Route
                path="/vendor/update/:productId"
                element={
                  <RoleBasedRoute
                    element={<UpdateProduct />}
                    allowedRoles={[4]}
                  />
                }
              />
              <Route
                path="/vendor/inventory"
                element={
                  <RoleBasedRoute
                    element={<ManageInventory />}
                    allowedRoles={[4]}
                  />
                }
              />
              <Route
                path="orders"
                element={
                  <RoleBasedRoute element={<Orders />} allowedRoles={[4]} />
                }
              />
              <Route
                path="/cancel/orders"
                element={
                  <RoleBasedRoute
                    element={<CancelOrders />}
                    allowedRoles={[4]}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

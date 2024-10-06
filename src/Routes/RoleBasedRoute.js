import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Spinner } from "react-bootstrap";

// Higher-Order Component to protect routes by role
const RoleBasedRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(allowedRoles);
  console.log(user);

  if (loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle d-flex-column text-center">
        <Spinner
          animation="border"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="sr-only"></span>
        </Spinner>
        <p className="mt-3 font-monospace" style={{ fontSize: "16px" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return element;
};

export default RoleBasedRoute;

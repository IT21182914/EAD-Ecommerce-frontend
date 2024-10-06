import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported
import API_BASE_URL from "../config.js";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user data from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  // Login function
  const login = async (loginData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}login`, loginData);
      if (response.status === 200) {
        const userData = response.data.user; // Assuming API returns user data
        setUser(userData);

        // Save user data in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", response.data.token);

        // Display a success toast
        toast.success("Login successful!", { position: "top-right" });

        // Redirect based on role
        if (userData.role === 1) {
          navigate("/admin/dashboard");
        } else if (userData.role === 4) {
          navigate("/vendor/dashboard");
        } else if (userData.role === 3) {
          navigate("/csr/dashboard");
        }
      } else {
        // Display error toast
        toast.error("Login unsuccessful!", { position: "top-right" });
        console.log("Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
      });
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    localStorage.removeItem("accessToken"); // Remove token
    toast.info("Logged out successfully!", { position: "top-right" });
    navigate("/"); // Redirect to login page on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

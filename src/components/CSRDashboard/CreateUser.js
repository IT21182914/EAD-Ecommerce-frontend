import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "./CSRSidebar.js"; // Assuming you have AdminSidebar component
import axios from "axios";
import AdminNavBar from "../AdminDashboard/AdminNavBar.js";
import Sidebar from "./CSRSidebar.js";
import API_BASE_URL from "../../config.js";
import firebase from "firebase/compat/app";
import { storage } from "../../firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserRoleEnum = {
  CSR: 3,
  VENDOR: 4,
};

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_Password: "",
    phoneNumber:"",
    street: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    role: UserRoleEnum.CSR,
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      // Convert the value to a number, since the role is an integer
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); 
};
  
  const uploadImageToFirebase = async () => {

    try{
      if (image) {

        const storageRef = ref(storage, `images/${image.name}`);

        await uploadBytes(storageRef, image);

        console.log('File uploaded successfully!');

        const url = await getDownloadURL(storageRef);
    
        setImageUrl(url);
        console.log("THIS si url")
        console.log(url)
        return url;
      }else{
        console.log("Image file not define")
      }
      return "";
    }catch(err){
      console.log(err)
    }

  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      console.log("1st try")
    const uploadedImageUrl = await uploadImageToFirebase();
    console.log("end")

    formData.re_Password = formData.password;
    const requestBody ={
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      re_Password: formData.re_Password,
      phoneNumber: formData.phoneNumber,
      addresss: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      },
      role: formData.role,
      createdDate: new Date().toISOString(), 
      updatedDate: new Date().toISOString(),
      isActive: true, 
      profilePicture: uploadedImageUrl,
    }
    // try {
      const token = localStorage.getItem("accessToken")
      const response = await axios.post(
        `${API_BASE_URL}create-by-admin`,
        requestBody,
        {
          headers:{
            Authorization : `bearer ${token}`,
            'Content-Type' : 'application/json'
          },
        }
      );
      toast.success("Vendor profile created successfully!", {
        position: "top-right",
      });
      setLoading(false);
      // navigate("/admin/vendors");
    } catch (error) {

      if (error.response && error.response.status === 405) {
        toast.error("An account already exists with this email!", {
          position: "top-right",
        });
      } 

      else {
        toast.error("Vendor creation failed. Please try again.", {
          position: "top-right",
        });
      }

      setLoading(false);
    }
  };

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
        <div style={{ flex: 1, maxWidth: "800px", width: "100%", margin: "auto", padding: "5px"}}>
          <h2 className="text-center my-4 text-primary display-4">
            Create Vendor
          </h2>

          {loading && (
            <div className="text-center my-5">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}

          {!loading && (
            <Form
              onSubmit={handleSubmit}
              className="shadow p-5 rounded-4 "
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Row>
                <Col md={8}>
                  <Form.Group
                    controlId="vendorName"
                    className="mb-3 d-flex flex-row justify-content-between"
                  >
                    <div>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="Address"
                    className="mb-3 d-flex flex-row justify-content-between"
                  >
                    <div>
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        required
                      />

                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />

                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                      />
                    </div>
                    <div>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />

                      <Form.Label>ZipCode</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZipCode"
                        required
                      />
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select" 
                        name="role"
                        value={formData.role} 
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Role</option> {/* Placeholder option */}
                        <option value="3">CSR</option>
                        <option value="4">Vendor</option>
                      </Form.Control>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="imageUpload" className="mb-3">
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                  </Form.Group>


                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-100 py-2"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      borderRadius: "25px",
                      backgroundColor: "#007bff",
                      border: "none",
                    }}
                  >
                    {loading ? "Creating..." : "Create Profile"}
                  </Button>
                </Col>

                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    roundedCircle
                    style={{
                      width: "150px",
                      height: "160px",
                      objectFit: "cover",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </Col>
              </Row>
            </Form>
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
        </div>
      </Container>
      <style>{`
        .form-control {
          padding: 12px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.5);
        }
        .btn-primary:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }
      `}</style>
    </div>
    </div>
  );
};

export default CreateUser;

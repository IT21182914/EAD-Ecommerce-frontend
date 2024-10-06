import { Dropdown } from "react-bootstrap";
import React, { useContext } from "react";
import "../../App.css";
import { AuthContext } from "../../Context/AuthContext";
import profilePic from "../../assets/default_user.png";


export default function ProfileActionButton() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="profile-dropdown-toggle rounded-circle"
        style={{
          width: 40,
          height: 40,
          padding: 0,
          backgroundImage: `url(${user.profilePicture ?? profilePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "none",
        }}
        id="dropdown-basic"
      />
      <Dropdown.Menu>
        <Dropdown.Item href="#">Home Page</Dropdown.Item>
        <Dropdown.Item href="#">Settings</Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

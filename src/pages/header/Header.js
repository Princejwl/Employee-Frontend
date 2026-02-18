import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { clearUser } from "../../utils/auth";
import React, { useState } from "react";
import Toast from "../../components/Toast";

const Header = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setToast({ message: "Logout failed, please try again.", type: "error" });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Navbar expand="lg" className="custom-navbar">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/" className="brand">
            <strong>Employee Management System</strong>
          </Navbar.Brand>

          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-btn">
              Employees
            </Nav.Link>
            <Nav.Link as={Link} to="/employee" className="nav-btn special">
              Post Employee
            </Nav.Link>
            <button onClick={handleLogout} className="nav-btn logout-btn">
              Logout
            </button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

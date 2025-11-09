import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

// 🔹 Import Firebase + Auth utilities
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";   // adjust path if needed
import { clearUser } from "../../utils/auth";  // clears localStorage

const Header = () => {
  const navigate = useNavigate();

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);   // Firebase logout
      clearUser();           // clear localStorage user data
      navigate("/login");    // redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed, please try again.");
    }
  };

  return (
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

          {/* 🔹 Logout Button */}
          <button onClick={handleLogout} className="nav-btn logout-btn">
            Logout
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

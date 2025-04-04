import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import axiosIns from "../axiosIns";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  function handleOpenLogin() {
    if (showSignUp === true) {
      setShowSignUp(false);
    }
    setShowLogin(true);
  }
  function handleCloseLogin() {
    setShowLogin(false);
  }
  function handleOpenSignUp() {
    if (showLogin === true) {
      setShowLogin(false);
    }
    setShowSignUp(true);
  }
  function handleCloseSignUp() {
    setShowSignUp(false);
  }

  const handleLogout = async () => {
    try {
      await axiosIns.post("/logout", {}, { withCredentials: true });

      localStorage.removeItem("accessToken");

      window.location.href = "/home";
    } catch (error) {
      console.error("Error occured while logging out: ", error.message);
    }
  };

  return (
    <Navbar expand="sm" style={{ backgroundColor: "#f1f3f5" }}>
      <Container>
        <img src="/logo.png" />
        <Navbar.Brand href="/home">SkillBridge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/jobs">
              Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <div className="dashboardButton">
                  <Link to="/dashboard">Dashboard</Link>
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              </>
            ) : (
              <>
                <Button type="submit" onClick={handleOpenLogin}>
                  Log In
                </Button>
                <Button type="submit" onClick={handleOpenSignUp}>
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        handleSwitch={handleOpenSignUp}
      />

      <SignUpModal
        show={showSignUp}
        handleClose={handleCloseSignUp}
        handleSwitch={handleOpenLogin}
      />
    </Navbar>
  );
}

export default Header;

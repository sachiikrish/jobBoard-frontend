import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosIns from "../axiosIns";
import { AuthToast } from "./authToast";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, handleClose, handleSwitch }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loginData, setLoginData] = useState({ Username: "", Password: "" });
  const handleChange = (e) => {
    try {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(
        "Error while handling changes in the login form : ",
        error.message
      );
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosIns.post("/login", loginData);
      localStorage.setItem("accessToken", response.data.accessToken);
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
      setToastMessage(response.data.message);
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Login request error:", error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(
          error.response.data.message
        );
      }
    }
  };

  const closeToast = () => {
    setShowSuccessToast(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={loginSubmit}>
            {/* Username */}
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="Username"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Login Button */}
            <Button variant="primary" type="submit" className="w-100">
              Log In
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
          <Button variant="outline-primary" onClick={handleSwitch}>
            Create an account
          </Button>
        </Modal.Footer>
      </Modal>

      {showSuccessToast && (
        <AuthToast
          toastSuccess={showSuccessToast}
          closeToast={closeToast}
          message={toastMessage}
        />
      )}
    </>
  );
}

export default LoginModal;

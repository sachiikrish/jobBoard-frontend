import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosIns from "../axiosIns";
import { AuthToast } from "./authToast";
import { useNavigate } from "react-router-dom";

function SignUpModal({ show, handleClose, handleSwitch }) {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [signupData, setSignupData] = useState({
    Name: "",
    Username: "",
    Email: "",
    Role: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    try {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(
        "Error while handling changes in the signup form : ",
        error.message
      );
    }
  };
  const signupSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosIns.post("/signup", signupData);
      setShowSuccessToast(true);
      setToastMessage(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error while submitting the signup form : ", error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
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
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={signupSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="Name"
                id="Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="Username"
                id="Username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="Email"
                id="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <div>
                <label htmlFor="RoleCandidate" className="me-3">
                  <input
                    type="radio"
                    name="Role"
                    id="RoleCandidate"
                    value="candidate"
                    className="me-2"
                    onChange={handleChange}
                    required
                  />
                  Candidate
                </label>
                <label htmlFor="RoleEmployer">
                  <input
                    type="radio"
                    name="Role"
                    id="RoleEmployer"
                    value="employer"
                    className="me-2"
                    onChange={handleChange}
                    required
                  />
                  Employer
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="Password"
                id="Password"
                required
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ConfirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="ConfirmPassword"
                id="ConfirmPassword"
                required
                placeholder="Confirm your password"
                onChange={handleChange}
              />
            </div>

            <Button type="submit" variant="primary" className="w-100">
              Sign Up
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <span>Already have an account?</span>
          <Button variant="link" onClick={handleSwitch}>
            Login
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

export default SignUpModal;

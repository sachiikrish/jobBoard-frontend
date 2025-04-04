import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axiosIns from "../axiosIns";
import { AuthToast } from "./authToast";
import { ErrorToast } from "./errorToast";

function ApplicationModal({ show, onHide, jobTitle, jobCompany, jobID }) {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Resume: null,
  });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorToastmessage, setErrorToastMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);

  function handleChange(e) {
    if (e.target.type === "file") {
      setFormData({ ...formData, Resume: e.target.files[0] }); // store file object
    }
  }

  const submitApplication = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Resume", formData.Resume);

    console.log("File being sent: ", formData.Resume);

    try {
      const response = await axiosIns.post(`/apply/${jobID}`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      setToastMessage(response.data.message);
      onHide();
      setShowToast(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorToastMessage(error.response.data.message);
        onHide();
        setShowErrorToast(true);
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {jobTitle} - {jobCompany}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitApplication}>
            {/* <label htmlFor="Name">Name</label>
            <br></br>
            <input
              type="text"
              name="Name"
              id="Name"
              onChange={handleChange}
              required
            ></input>
            <br></br>

            <label htmlFor="Email">Email</label>
            <br></br>
            <input
              type="email"
              name="Email"
              id="Email"
              onChange={handleChange}
              required
            ></input>
            <br></br> */}

            <label htmlFor="Resume">Uplaod your Resume</label>
            <br></br>
            <input
              type="file"
              name="Resume"
              id="Resume"
              onChange={handleChange}
              accept=".pdf,.docx"
              required
            ></input>
            <br></br>

            <button type="submit">Apply</button>
          </form>
        </Modal.Body>
      </Modal>

      <AuthToast
        toastSuccess={showToast}
        closeToast={() => setShowToast(false)}
        message={toastMessage}
      />

      <ErrorToast 
        toastError={showErrorToast}
        closeToast={() => setShowErrorToast(false)}
        message={errorToastmessage}
      />
    </>
  );
}

export default ApplicationModal;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axiosIns from "../axiosIns";
import BlueSpinner from "../components/Spinner";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Aos from "aos";
import { AuthToast } from "../components/authToast";
import { ErrorToast } from "../components/errorToast";

export const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axiosIns.get(`/applicant/${id}`);
        console.log("API response: ", response.data);
        setApplication(response.data.applicationDetails);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        }
      }
      setLoading(false);
    };
    fetchApplication();
    Aos.init();
  }, [id]);

  const acceptApp = async (id, email) => {
    try {
      const response = await axiosIns.post(`/accept/${id}`, {
        candidateEmail: email,
      });
      setToastMessage(response.data.message);
      setShowToast(true);
    } catch (error) {
      console.error(error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        setShowErrorToast(true);
      }
    }
  };

  const rejectApp = async (id, email) => {
    try {
      const response = await axiosIns.post(`/reject/${id}`, {
        candidateEmail: email,
      });
      setToastMessage(response.data.message);
      setShowToast(true);
    } catch (error) {
      console.error(error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        setShowErrorToast(true);
      }
    }
  };
  if (loading) {
    return (
      <>
        <div
          style={{ height: "100vh", width: "100vw" }}
          className="d-flex justify-content-center align-items-center"
        >
          <BlueSpinner />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="header">
          <Header />
        </div>
        <div className="body" data-aos="fade-up" data-aos-duration="500">
          <Container className="py-5">
            {/* Candidate Details Section */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h3 className="mb-3">Candidate Details</h3>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Name:</strong> {application.userID?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {application.userID?.email}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Resume:</strong>
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2 btn btn-outline-primary btn-sm"
                      >
                        View Resume
                      </a>
                      {application.status}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Job Details Section */}
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="mb-3">Job Details</h3>
                <p>
                  <strong>Title:</strong> {application.jobID?.title}
                </p>
                <p>
                  <strong>Company:</strong> {application.jobID?.company}
                </p>
                <p>
                  <strong>Description:</strong> {application.jobID?.description}
                </p>
              </Card.Body>
            </Card>

            {/* Back Button */}
            <div className="text-center mt-4">
              <Row>
             <Col sm={4}>
             <Button variant="secondary" onClick={() => window.history.back()}>
                Go Back
              </Button>
             </Col>
              <Col sm={4}>
              <Button
                variant="success"
                onClick={() => acceptApp(id, application.userID.email)}
                disabled={application.status !== "pending"}
              >
                Accept
              </Button>
              </Col>
              <Col sm={4}>
              <Button
                variant="danger"
                onClick={() => rejectApp(id, application.userID.email)}
                disabled={application.status !== "pending"}
              >
                Reject
              </Button>
              </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="footer">
          <Footer />
        </div>

        {/* Toast */}
        <AuthToast
          toastSuccess={showToast}
          message={toastMessage}
          closeToast={() => setShowToast(false)}
        />
        <ErrorToast
          toastError={showErrorToast}
          message={errorMessage}
          closeToast={() => setShowErrorToast(false)}
        />
      </>
    );
  }
};

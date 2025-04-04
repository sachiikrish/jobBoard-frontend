import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Button, ListGroup, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaTrashAlt, FaEye } from "react-icons/fa"; // React Bootstrap Icons
import axiosIns from "../axiosIns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobModal from "../components/jobModal";
import DeleteModal from "../components/DeleteModal";
import { AuthToast } from "../components/authToast";
import Aos from "aos";

export const EmployerDash = () => {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [jobID, setJobID] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [jobsArray, setJobsArray] = useState([]);
  const [applicationsArray, setApplicationArray] = useState([]);
  const [appId, setAppId] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosIns.get("/user/jobs");
        console.log(response.data);
        setJobsArray(response.data.jobsWithApplicant);
        setApplicationArray(response.data.applications);
      } catch (error) {
        console.error(
          "Error occurred while receiving the user's posted jobs list: ",
          error.message
        );
      }
    };
    fetchJobs();
  }, []);

  const handleModalOpen = () => {
    setShow(true);
  };

  const deleteJob = async () => {
    try {
      const response = await axiosIns.delete(`/jobDelete/${jobID}`);
      setToastMessage(response.data.message);
      setDeleteModal(false);
      setShowToast(true);
    } catch (error) {
      console.error("Error occurred while deleting the job: ", error.message);
    }
  };

  const confirmJobDelete = (id) => {
    setJobID(id);
    setDeleteModal(true);
    setDeleteType("Job");
  };

  const confirmAppDelete = (id) => {
    setAppId(id);
    setDeleteModal(true);
    setDeleteType("Application");
  };

  const deleteApp = async () => {
    try {
      const response = await axiosIns.delete(`/applications/delete/${appId}`);
      setToastMessage(response.data.message);
      setDeleteModal(false);
      setShowToast(true);
    } catch (error) {
      console.error(
        "Error occurred while deleting the application: ",
        error.message
      );
    }
  };

  return (
    <>
      {/* Existing Body Section */}
      <div className="employerPage">
        <div className="header">
          <Header />
        </div>

        <div className="body">
          <Row>
            <div
              className="d-flex  mt-4 mb-4"
              data-aos="fade-right"
              data-aos-duration="1300"
            >
              <Col md={6}>
                <div className="m-5">
                  <h1>Welcome, {user.name}!</h1>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handleModalOpen}
                  >
                    <FaPlusCircle /> Post a Job
                  </Button>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <img src="/images/employer.jpg" />
                </div>
              </Col>
            </div>
          </Row>

          <Row>
            <div className="p-5 pb-2">
              <h2 className="mb-2">Your Jobs</h2>
              {jobsArray.length > 0 ? (
                <div
                  className="w-full overflow-x-auto"
                  data-aos="fade-in"
                  data-aos-duration="1300"
                >
                  <div
                    className="d-flex gap-3 p-3"
                    style={{ minWidth: "max-content" }}
                  >
                    {jobsArray.map((job) => (
                      <Card
                        key={job._id}
                        className="shadow-sm border p-3 d-flex flex-column justify-content-between"
                        style={{ width: "300px", height: "200px" }} // Ensuring square shape
                      >
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <div>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Text>
                              Applicants: {job.applicantCount}
                            </Card.Text>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Link
                              to={`/employer/jobs/${job._id}`}
                              className="btn btn-secondary text-white"
                            >
                              <FaEye /> View
                            </Link>
                            <Button
                              variant="danger"
                              onClick={() => confirmJobDelete(job._id)}
                            >
                              <FaTrashAlt /> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="mt-4">
                  <Card.Body>
                    No job posts found. Create one to get started!
                  </Card.Body>
                </Card>
              )}
            </div>
          </Row>

          <Row>
            <div className="p-5">
              <h2 className="mb-2">Applications</h2>
              {applicationsArray.length > 0 ? (
                <div
                  className="w-full overflow-x-auto"
                  data-aos="fade-in"
                  data-aos-duration="1300"
                >
                  <div
                    className="d-flex gap-3 p-3"
                    style={{ minWidth: "max-content" }}
                  >
                    {applicationsArray.map((app) => (
                      <Card
                        key={app._id}
                        className="shadow-sm border p-3 d-flex flex-column justify-content-between"
                        style={{ width: "300px", height: "200px" }} // Square shape
                      >
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <div>
                            <Card.Title>{app.userID.name}</Card.Title>
                            <Card.Text>
                              {app.jobID.title} - {app.jobID.company}
                            </Card.Text>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Link
                              to={`/employer/applications/${app._id}`}
                              className="btn btn-secondary text-white"
                            >
                              <FaEye /> View
                            </Link>

                            <Button
                              className="btn btn-danger text-white"
                              onClick={() => confirmAppDelete(app._id)}
                            >
                              <FaTrashAlt /> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="mt-4">
                  <Card.Body>No applications found.</Card.Body>
                </Card>
              )}
            </div>
          </Row>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>

      {/* Job Modal */}
      <JobModal
        show={show}
        onHide={() => setShow(false)}
        handleClose={() => setShow(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        onClose={() => setDeleteModal(false)}
        show={showDeleteModal}
        onConfirm={deleteType == "Job" ? deleteJob : deleteApp}
        type={deleteType}
      />



      {/* Toast Notification */}
      <AuthToast
        toastSuccess={showToast}
        closeToast={() => setShowToast(false)}
        message={toastMessage}
      />
    </>
  );
};

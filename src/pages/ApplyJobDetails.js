import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosIns from "../axiosIns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlueSpinner from "../components/Spinner";
import "../assets/css/applyJob.css";
import {
  GeoAlt,
  Briefcase,
  Building,
  FileText,
  CheckCircle,
  CurrencyRupee,
  Clock,
  ArrowRepeat,
  Hourglass,
  GraphUp,
} from "react-bootstrap-icons";
import { Col, Row, Card, Button } from "react-bootstrap";
import ApplicationModal from "../components/ApplicationModal";

export const ApplyJobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchDetails = async (jobID) => {
    try {
      const response = await axiosIns.get(`/jobs/${jobID}`);
      setJobDetails(response.data);
    } catch (error) {
      console.error(
        "Error occured while sending request from the frontend to fetch job details ",
        error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="apply-detailsPage">
        <div className="header">
          <Header />
        </div>
        <div className="body d-flex justify-content-center align-items-center">
          <BlueSpinner />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div className="apply-detailsPage">
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <div className="jobsContainer">
            <Row>
              <Col md={12}>
                <div className="heading">
                  <h2 style={{ textAlign: "center" }}>{jobDetails.title}</h2>
                  <p>{jobDetails.jobType.toUpperCase()}</p>
                </div>
              </Col>
              <Col md={12}>
                <div className="detailsContainer">
                  <Row>
                    <Col md={12}>
                      <div className="companyName">
                        <h6><Briefcase
                        style={{color:"brown"}}
                         /> {jobDetails.company}</h6>
                      </div>

                      <div className="location">
                        <h6><GeoAlt style={{ color: "red" }} /> {jobDetails.location}</h6>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Row>
                        <Col sm={3}>
                          <div className="start">
                            <Clock />
                            <span>{jobDetails.startDate}</span>
                          </div>
                        </Col>
                        <Col sm={3}>
                          <div className="end">
                            <ArrowRepeat />
                            <span>{jobDetails.endDate}</span>
                          </div>
                        </Col>
                        <Col sm={3}>
                          <div className="salary">
                            <CurrencyRupee />
                            <span>{jobDetails.salary}/- month</span>
                          </div>
                        </Col>
                        <Col sm={3}>
                          <div className="apply">
                            <Hourglass />
                            <span>{jobDetails.deadline}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
                      <h6>
                        <FileText /> Job Description
                      </h6>
                      <p>{jobDetails.description}</p>
                    </Col>
                    <Col md={12}>
                      <h6>
                        <CheckCircle /> Requirements
                      </h6>
                      <p>{jobDetails.requirements}</p>
                    </Col>
                    <Col md={12}>
                      <div>
                        <h6>
                          <GraphUp /> Experience
                        </h6>
                        <span>{jobDetails.experience}</span>
                      </div>
                    </Col>
                    <Col m={12}>
                      <div className="applyButton">
                        <button onClick={() => setShowModal(true)}
                        className="apply-now-btn"
                        >Apply Now</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>

        <ApplicationModal
          show={showModal}
          onHide={() => setShowModal(false)}
          jobTitle={jobDetails.title}
          jobCompany={jobDetails.company}
          jobID={id}
        />
      </div>
    );
  }
};

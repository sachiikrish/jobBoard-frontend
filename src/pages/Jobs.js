import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosIns from "../axiosIns";
import {
  Card,
  Button,
  Row,
  Col,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import {
  fields,
  types,
  experiences,
  minSalaries,
  maxSalaries,
} from "../data/data";
import { Link } from "react-router-dom";
import Aos from "aos";
import { Form } from "react-bootstrap";

export const Jobs = () => {
  const [jobsList, setList] = useState([]);
  const [minSalary, setMin] = useState(null);
  const [maxSalary, setMax] = useState(null);
  const [category, setCategory] = useState("");
  const [exp, setExp] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchJobList = async () => {
      const response = await axiosIns.get("/jobsList");
      setList(response.data);
    };

    fetchJobList();
    Aos.init();
  }, []);

  const fetchWithFilters = async (e) => {
    e.preventDefault();

    const filters = {
      jobCategory: category,
      type: type,
      experience: exp,
      max: maxSalary,
      min: minSalary,
    };

    try {
      console.log("Sending filters:", filters);
      const response = await axiosIns.get("/jobsList", { params: filters });

      setList(response.data); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
      setList([]); // Set an empty array in case of error
    }
  };

  return (
    <div className="jobsPage">
      <div className="header">
        <Header />
      </div>

      <div className="body">
        {/* Filter Buttons */}
        <Container className="mb-4 mt-4 d-flex justify-content-center">
          <form onSubmit={fetchWithFilters}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {fields.map((field, index) => {
                return (
                  <option key={index} value={field}>
                    {field}
                  </option>
                );
              })}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Type</option>
              {types.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>

            <select value={exp} onChange={(e) => setExp(e.target.value)}>
              <option value="">Experience</option>
              {experiences.map((exp, index) => {
                return (
                  <option value={exp} key={index}>
                    {exp}
                  </option>
                );
              })}
            </select>

            <select value={minSalary} onChange={(e) => setMin(e.target.value)}>
              <option value="">Minimum</option>
              {minSalaries.map((salary, index) => {
                return (
                  <option key={index} value={salary}>
                    {salary}
                  </option>
                );
              })}
            </select>

            <select value={maxSalary} onChange={(e) => setMax(e.target.value)}>
              <option value="">Maximum</option>
              {maxSalaries.map((salary, index) => {
                return (
                  <option key={index} value={salary}>
                    {salary}
                  </option>
                );
              })}
            </select>

            <button type="submit">Filter</button>
          </form>
        </Container>

        {/* Job Cards */}
        <Container>
          <Row>
            {jobsList.map((job) => (
              <Col
                md={4}
                key={job._id}
                className="mb-4"
                data-aos="fade-up"
                data-aos-duration="1300"
              >
                <Card className="job-card">
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company}
                    </Card.Subtitle>
                    <Card.Text>Location: {job.location}</Card.Text>
                    <Link to={`/jobs/${job._id}`}>
                      <Button variant="primary">View</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

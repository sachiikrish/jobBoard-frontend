import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosIns from "../axiosIns";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, Row, Col } from "react-bootstrap";
import {
  Envelope,
  Briefcase,
  Pin,
  FileText,
  FileLock,
  CurrencyDollar,
  Clock,
  Calendar,
  Person,
} from "react-bootstrap-icons";
import { AuthToast } from "./authToast";

function JobModal({ show, onHide, handleClose }) {
  const [formData, setFormData] = useState({
    Title: "",
    Company: "",
    Description: "",
    Requirements: "",
    Salary: "",
    Location: "",
    start: "",
    end: "",
    applyBy: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosIns.post("/postJob", formData);
      setShowToast(true);
      setToastMessage(response.data.message);
      handleClose();
      setFormData({
        Title: "",
        Company: "",
        Description: "",
        Requirements: "",
        Salary: "",
        Location: "",
        Category: "",
        Experience: "",
      });
    } catch (error) {
      console.error("Error occured while posting the job: ", error.message);
    }
  };

  function closeToast() {
    setShowToast(false);
  }
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Post Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={submitJob}>
  <Row className="mb-3">
    {/* Title and Company Inputs */}
    <Col md={6}>
      <Form.Group controlId="formTitle">
        <Form.Label className="font-weight-bold">Title</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Briefcase size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
            placeholder="Enter job title"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group controlId="formCompany">
        <Form.Label className="font-weight-bold">Company</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Envelope size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="Company"
            value={formData.Company}
            onChange={handleChange}
            required
            placeholder="Enter company name"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    {/* Location and Job Type Inputs */}
    <Col md={6}>
      <Form.Group controlId="formLocation">
        <Form.Label className="font-weight-bold">Location</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Pin size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
            placeholder="Enter job location"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group controlId="formType">
        <Form.Label className="font-weight-bold">Type</Form.Label>
        <div className="d-flex flex-column">
          <Form.Check
            type="radio"
            label={
              <>
                <Clock size={18} className="mr-2" />
                Part-time
              </>
            }
            name="Type"
            value="Part-time"
            checked={formData.Type === "Part-time"}
            onChange={handleChange}
            id="partTime"
            required
            inline
            className="mb-2"
          />
          <Form.Check
            type="radio"
            label={
              <>
                <Calendar size={18} className="mr-2" />
                Full-time
              </>
            }
            name="Type"
            value="Full-time"
            checked={formData.Type === "Full-time"}
            onChange={handleChange}
            id="fullTime"
            required
            inline
            className="mb-2"
          />
          <Form.Check
            type="radio"
            label={
              <>
                <Person size={18} className="mr-2" />
                Internship
              </>
            }
            name="Type"
            value="Internship"
            checked={formData.Type === "Internship"}
            onChange={handleChange}
            id="internship"
            required
            inline
            className="mb-2"
          />
        </div>
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    {/* Category and Experience Inputs */}
    <Col md={6}>
      <Form.Group controlId="formCategory">
        <Form.Label className="font-weight-bold">Job Category</Form.Label>
        <Form.Control
          as="select"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
          className="form-control-sm border rounded-2 shadow-sm"
        >
          <option value="">Select a category</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="IT & Software">IT & Software</option>
          <option value="Business">Business</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Design">Design</option>
        </Form.Control>
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group controlId="formExp">
        <Form.Label className="font-weight-bold">Experience</Form.Label>
        <Form.Control
          as="select"
          name="Experience"
          value={formData.Experience}
          onChange={handleChange}
          required
          className="form-control-sm border rounded-2 shadow-sm"
        >
          <option value="">Select Experience level</option>
          <option value="Entry">Entry-level</option>
          <option value="Mid">Mid-level</option>
          <option value="Senior">Senior</option>
          <option value="Manager">Manager</option>
        </Form.Control>
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    {/* Description and Requirements Inputs */}
    <Col md={6}>
      <Form.Group controlId="formDescription">
        <Form.Label className="font-weight-bold">Description</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <FileText size={18} />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={3}
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            placeholder="Enter job description"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group controlId="formRequirements">
        <Form.Label className="font-weight-bold">Requirements</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <FileLock size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="Requirements"
            value={formData.Requirements}
            onChange={handleChange}
            required
            placeholder="Enter job requirements"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    {/* Salary Input */}
    <Col md={6}>
      <Form.Group controlId="formSalary">
        <Form.Label className="font-weight-bold">Salary</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <CurrencyDollar size={18} />
          </InputGroup.Text>
          <Form.Control
            type="number"
            name="Salary"
            value={formData.Salary}
            onChange={handleChange}
            required
            placeholder="Enter salary"
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formApplyDate">
        <Form.Label className="font-weight-bold">Apply By Date</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Calendar size={18} />
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="applyBy"
            value={formData.applyBy}
            onChange={handleChange}
            required
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group controlId="formStartDate">
        <Form.Label className="font-weight-bold">Start Date</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Calendar size={18} />
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formEndDate">
        <Form.Label className="font-weight-bold">End Date</Form.Label>
        <InputGroup className="border rounded-2 shadow-sm">
          <InputGroup.Text className="bg-primary text-white">
            <Calendar size={18} />
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
            className="form-control-sm"
          />
        </InputGroup>
      </Form.Group>
    </Col>
  </Row>

  {/* Submit Button */}
  <Button variant="primary" type="submit" className="mt-3">
    Post Job
  </Button>
</Form>

        </Modal.Body>
      </Modal>

      {showToast && (
        <AuthToast
          message={toastMessage}
          toastSuccess={showToast}
          closeToast={closeToast}
        />
      )}
    </>
  );
}
export default JobModal;

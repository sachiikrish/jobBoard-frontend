import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="text-center text-md-start">SkillBridge</h5>
            <p className="text-center text-md-start">Your gateway to the perfect job.</p>
          </Col>
          <Col md={6} className="text-md-end text-center">
            <div>CONTACT FORM</div>
            <div className="mt-3">
              <a href="#" className="text-light mx-2"><FaFacebook size={20} /></a>
              <a href="#" className="text-light mx-2"><FaTwitter size={20} /></a>
              <a href="#" className="text-light mx-2"><FaLinkedin size={20} /></a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2025 SkillBridge. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

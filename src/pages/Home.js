import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { categories, companies } from "../data/data";
import CategoryCard from "../components/JobCatCard";
import CompanyCard from "../components/CompanyCard";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="homePage">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div className="heroSection">
          <Row style={{ width: "100%" }}>
            <Col md={6}>
              <div
                className="headingContainer"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <div style={{ width: "max-content" }}>
                  <div className="heading">Explore Opportunities</div>
                  <div className="subheading">
                    Browse thousands of jobs in various fields.
                  </div>
                  <div className="callAction mt-3">
                    <Link to="/jobs">
                      <Button>Start your job search now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="front-image">
                <img src="/images/userSearch.png" />
              </div>
            </Col>
          </Row>
        </div>

        <div className="featuredJobsCatg">
          <div>
            <div className="headingContainer">
              <div
                className="heading"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                Featured Jobs Categories
              </div>
            </div>

            <div className="jobCatCardsContainer">
              <Container className="my-4">
                <Row className="g-4">
                  {categories.map((category, index) => (
                    <Col key={index} md={3} sm={6} xs={12}>
                      <CategoryCard
                        title={category.title}
                        icon={category.icon}
                        color={category.color}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>

        <div className="featuredCompanies">
          <div>
            <div className="headingContainer">
              <div
                className="heading"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                Companies That Trust Us
              </div>
            </div>

            <div className="companiesContainer">
              <Container className="my-4">
                <Row className="g-4">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                  >
                    {companies.map((company, index) => (
                      <SwiperSlide>
                        <Col key={index} md={3} sm={6} xs={12}>
                          <CompanyCard
                            image={company.image}
                          />
                        </Col>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

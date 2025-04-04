import React from "react";
import { Card } from "react-bootstrap";

const CompanyCard = ({ title, image }) => {
  return (
    <Card
      className="text-center p-3 shadow-sm CompanyCard"
      style={{ borderRadius: "10px"}}
      data-aos="fade-left"
      data-aos-duration="1500"
    >
      <img src={image} />
    </Card>
  );
};

export default CompanyCard;

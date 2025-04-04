import React from "react";
import { Card } from "react-bootstrap";

const CategoryCard = ({ title, icon, color, image }) => {
  return (
    <Card
      className="text-center p-3 shadow-sm jobCatCard"
      style={{ backgroundColor: color, borderRadius: "10px" }}
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="mb-3">{icon}</div>
      <Card.Title>{title}</Card.Title>
    </Card>
  );
};

export default CategoryCard;

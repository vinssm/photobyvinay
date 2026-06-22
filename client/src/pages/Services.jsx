import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const services = [
  {
    title: "Portrait Sessions",
    description:
      "Professional headshots, personal portraits, and family photos. Studio or on-location. Includes edited digital files and a short consultation to plan the look and feel.",
    price: "Starting at $150",
  },
  {
    title: "Event Photography",
    description:
      "Full-day or half-day coverage for weddings, corporate events, birthdays, and celebrations. Delivered as a curated gallery of high-resolution edited images.",
    price: "Starting at $400",
  },
  {
    title: "Landscape & Travel",
    description:
      "Fine-art landscape prints available for purchase. Custom shoots for travel and real-estate clients. Prints available in multiple sizes.",
    price: "Starting at $200",
  },
  {
    title: "Commercial & Product",
    description:
      "Clean, striking product photography for e-commerce, social media, and print campaigns. Flat-lay, lifestyle, and studio setups available.",
    price: "Starting at $250",
  },
];

function Services() {
  return (
    <div className="page-div">
      <Container className="padTop">
        <h2 className="center">Services</h2>
        <p className="center small" style={{ marginBottom: "2.5rem" }}>
          Every session is tailored to your goals. Reach out for a custom quote.
        </p>

        <Row>
          {services.map((service) => (
            <Col
              key={service.title}
              xs={12}
              md={6}
              style={{ marginBottom: "1.5rem" }}
            >
              <Card className="h-100" style={{ borderColor: "#dee2e6" }}>
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <p className="small" style={{ marginBottom: 0 }}>
                    {service.price}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row
          className="justify-content-center"
          style={{ marginTop: "2.5rem", marginBottom: "3rem" }}
        >
          <Col xs={12} md={6} className="center">
            <p>Interested in booking or have questions about pricing?</p>
            <Button as={Link} to="/contact" variant="primary" size="lg">
              Contact Me
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Services;

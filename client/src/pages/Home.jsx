import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <Container className="center padTop">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <h1 className="fancy" style={{ fontSize: "3rem" }}>
              Photography by Vinay
            </h1>
            <p
              className="small"
              style={{ fontSize: "1.2rem", marginBottom: "2rem" }}
            >
              Capturing moments that last a lifetime
            </p>
            <p style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
              Welcome to my portfolio. I specialize in portrait, event, and
              landscape photography — bringing artistry and technical precision
              to every shot.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button as={Link} to="/about" variant="primary" size="lg">
                About Me
              </Button>
              <Button
                as={Link}
                to="/services"
                variant="outline-secondary"
                size="lg"
              >
                View Services
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="outline-primary"
                size="lg"
              >
                Get in Touch
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center" style={{ marginTop: "4rem" }}>
          <Col
            xs={12}
            md={4}
            className="center"
            style={{ marginBottom: "2rem" }}
          >
            <h4>Portrait</h4>
            <p className="small">
              Professional headshots and personal portraits tailored to your
              vision.
            </p>
          </Col>
          <Col
            xs={12}
            md={4}
            className="center"
            style={{ marginBottom: "2rem" }}
          >
            <h4>Events</h4>
            <p className="small">
              Weddings, celebrations, and milestones preserved with care and
              detail.
            </p>
          </Col>
          <Col
            xs={12}
            md={4}
            className="center"
            style={{ marginBottom: "2rem" }}
          >
            <h4>Landscape</h4>
            <p className="small">
              Stunning natural and urban scenes captured in their finest light.
            </p>
          </Col>
        </Row>

        <Row
          className="justify-content-center"
          style={{ marginTop: "2rem", marginBottom: "3rem" }}
        >
          <Col xs={12} md={6}>
            <p>
              Ready to work together?{" "}
              <Link to="/signup">Create an account</Link> to access the full
              gallery or <Link to="/contact">reach out directly</Link>.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

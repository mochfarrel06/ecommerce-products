import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home__page">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs={12} md={6}>
            <div className="d-flex flex-column gap-4 mb-4">
              <h1 className="fs-1 fw-bolder lh-sm">
                Which Focuses on the Distribution of Premium Gadget Accessories.
              </h1>
              <p className="fs-6 text-secondary">
                With the combination of good design, nice style, and
                high-quality products to position our consumers at the highest
                level possible.
              </p>
              <Link to="/products">
                <Button>Show Products</Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-end">
            <img
              src="./landingpage.png"
              alt="Gambar Landing Page"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

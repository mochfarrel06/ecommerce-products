import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const FooterComponent = () => {
  return (
    <div className="bg-primary py-4 mt-5">
      <Container className="">
        <Row className="text-center">
          <Col className="text-white fw-semibold">Unitech Indonesia</Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;

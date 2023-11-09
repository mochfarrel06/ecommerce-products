import React from "react";
import {useParams} from "react-router-dom";
import products from "../../../utils/data.json";
import {Card, Col, Container, Row} from "react-bootstrap";

function ProductDetail() {
  const {productsId} = useParams();
  const thisProduct = products.data.find(
    (prod) => prod.product_id === productsId
  );

  return (
    <div className="min-vh-100 w-100 details-app">
      <Container>
        <Row md={12} className="bg-primary">
          <Col md={4} className="bg-warning">
            <img
              className="border"
              src={thisProduct.primary_image.original}
              alt={thisProduct.primary_image.__typename}
            />
          </Col>
          <Col md={8} className="bg-info">
            <div>
              <Card.Text>{thisProduct.name}</Card.Text>
              <div>
                {thisProduct.label_groups.map((labels, i) => {
                  if (i >= 0 && i < 1) {
                    return <Card.Text key={i}>{labels.title}</Card.Text>;
                  }
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;

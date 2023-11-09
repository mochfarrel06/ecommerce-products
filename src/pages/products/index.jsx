import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import products from "../../utils/data.json";
import {StarFill, List, Grid} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function ProductPage() {
  const [toggleView, setToggleView] = useState(true);

  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  return (
    <div className="products-app">
      <Container>
        <Row className="menus-products mb-5 border px-4 py-2 justify-content-between">
          <Col md={2} className="d-flex align-items-center gap-3">
            Appreance:
            <Button
              onClick={handleToggleView}
              className="bg-white btn-outline-light"
            >
              {toggleView ? (
                <Grid size={12} color="#000000" />
              ) : (
                <List size={12} color="#000000" />
              )}
            </Button>
          </Col>
          <Col md={2} className="bg-info">
            Sort by
          </Col>
          <Col md={2} className="bg-info">
            Sort by
          </Col>
          {/* <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col> */}
        </Row>
        {/* <Row>
          {products.data.map((datas, i) => (
            <Col key={i}>
              <Card className="shadow-sm">
                <Card.Img variant="top" src={datas.primary_image.thumbnail} />
                <Card.Body>
                  <Link to={`/products/${datas.product_id}`}>
                    <Card.Text className="text-truncate">
                      {datas.name}
                    </Card.Text>
                  </Link>
                  <Card.Title>{datas.price.text_idr}</Card.Title>
                  <div className="rating w-100 d-flex justify-content-between align-items-center">
                    <div className="d-flex py-2 gap-1">
                      <div className="d-flex gap-2 align-items-center">
                        <StarFill size={14} color="#fed700" />
                        <Card.Text>
                          {datas.stats.averageRating
                            ? datas.stats.averageRating
                            : "0"}{" "}
                          |
                        </Card.Text>
                      </div>
                      <div>
                        {datas.label_groups.map((labels, i) => {
                          if (i >= 0 && i < 1) {
                            return (
                              <Card.Text key={i}>{labels.title}</Card.Text>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div>
                      <Card.Text>Stock {datas.stock}</Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> */}
        <Row className="overflow-hidden products-container">
          {products.data.map((datas, i) => (
            <Col key={i} md={toggleView ? 2 : 12} className="">
              {toggleView ? (
                <Card className="">
                  <Card.Img variant="top" src={datas.primary_image.thumbnail} />
                  <Card.Body>
                    <Link to={`/products/${datas.product_id}`}>
                      <Card.Text className="text-truncate">
                        {datas.name}
                      </Card.Text>
                    </Link>
                    <Card.Title>{datas.price.text_idr}</Card.Title>
                    <div className="rating w-100 d-flex justify-content-between align-items-center">
                      <div className="d-flex py-2 gap-1">
                        <div className="d-flex gap-2 align-items-center">
                          <StarFill size={14} color="#fed700" />
                          <Card.Text>
                            {datas.stats.averageRating
                              ? datas.stats.averageRating
                              : "0"}{" "}
                            |
                          </Card.Text>
                        </div>
                        <div>
                          {datas.label_groups.map((labels, i) => {
                            if (i >= 0 && i < 1) {
                              return (
                                <Card.Text key={i}>{labels.title}</Card.Text>
                              );
                            }
                          })}
                        </div>
                      </div>
                      <div>
                        <Card.Text>Stock {datas.stock}</Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Header>Featured</Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ProductPage;

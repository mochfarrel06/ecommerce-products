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
    <div className="w-100 min-vh-100 products-app">
      <Container>
        <Row className="justify-content-between overflow-hidden mb-5">
          <Col className="d-flex align-items-center ">
            <p className="">Apprenace</p>
            <Button onClick={handleToggleView} className="bg-white">
              {toggleView ? (
                <Grid size={10} color="#000000" />
              ) : (
                <List size={10} color="#000000" />
              )}
            </Button>
          </Col>
          <Col>Sort by</Col>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
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
        <Row>
          {products.data.map((datas, i) => (
            <Col key={i} className={`mb-${toggleView ? 3 : 0}`}>
              {toggleView ? (
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
              ) : (
                <Card className="w-100 bg-info flex-row flex-norap">
                  <Card.Header as="h5">Featured</Card.Header>
                  <Card.Body className="d-flex">
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

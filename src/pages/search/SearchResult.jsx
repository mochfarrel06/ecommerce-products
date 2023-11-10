import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

function SearchResults({results}) {
  return (
    <Container className="mt-4">
      <h2>Search Results</h2>
      <Row className="overflow-hidden products-container">
        {results.map((data, i) => (
          <Col key={i} lg={4} md={4} sm={4} xs={12} className="mb-3">
            <Card>
              <Card.Img variant="top" src={data.primary_image.thumbnail} />
              <Card.Body>
                <Link to={`/products/${data.product_id}`}>
                  <Card.Text className="text-truncate">{data.name}</Card.Text>
                </Link>
                <Card.Title>{data.price.text_idr}</Card.Title>
                <div className="rating w-100 d-flex justify-content-between align-items-center">
                  <div className="d-flex py-2 gap-1">
                    <div className="d-flex gap-2 align-items-center">
                      <StarFill size={14} color="#fed700" />
                      <Card.Text>
                        {data.stats.averageRating
                          ? data.stats.averageRating
                          : "0"}{" "}
                        |
                      </Card.Text>
                    </div>
                    <div>
                      {data.label_groups.map(
                        (label, i) =>
                          i >= 0 &&
                          i < 1 && <Card.Text key={i}>{label.title}</Card.Text>
                      )}
                    </div>
                  </div>
                  <div>
                    <Card.Text>Stock {data.stock}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResults;

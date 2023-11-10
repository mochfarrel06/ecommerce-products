import React from "react";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

function ProductList({products}) {
  return (
    <div className="product-list">
      {products.map((datas, i) => (
        <Col
          key={i}
          lg={toggleView ? 2 : 12}
          md={toggleView ? 2 : 12}
          sm={toggleView ? 12 : 12}
          xs={12}
          className="mb-3"
        >
          {toggleView ? (
            <Card className="">
              <Card.Img variant="top" src={datas.primary_image.thumbnail} />
              <Card.Body>
                <Link to={`/products/${datas.product_id}`}>
                  <Card.Text className="text-truncate">{datas.name}</Card.Text>
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
                          return <Card.Text key={i}>{labels.title}</Card.Text>;
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
              <Card.Header>{datas.name}</Card.Header>
              <Card.Body>
                <Link to={`/products/${datas.product_id}`}>
                  <Card.Text className="text-truncate">{datas.name}</Card.Text>
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
                          return <Card.Text key={i}>{labels.title}</Card.Text>;
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
          )}
        </Col>
      ))}
    </div>
  );
}

export default ProductList;

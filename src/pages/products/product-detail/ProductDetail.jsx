import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import products from "../../../utils/data.json";
import {Card, Col, Container, Row} from "react-bootstrap";

function ProductDetail() {
  const {productsId} = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const foundProduct = products.data.find(
      (product) => product.product_id === productsId
    );

    if (foundProduct) {
      setProductDetail(foundProduct);
    }
  }, [productsId]);

  if (!productDetail) {
    return <div>Loading....</div>;
  }

  return (
    <div className="min-vh-100 w-100 details-app">
      <Container>
        <Row md={12}>
          <Col md={4}>
            <img
              className="border"
              src={productDetail.primary_image.original}
              alt={productDetail.primary_image.__typename}
            />
          </Col>
          <Col md={8}>
            <div>
              <h3 className="fs-4 fw-medium">{productDetail.name}</h3>
              <div className="d-flex gap-4 align-items-center text-secondary">
                <div>
                  {productDetail.label_groups.map((labels, i) => {
                    if (i >= 0 && i < 1) {
                      return <Card.Text key={i}>{labels.title}</Card.Text>;
                    }
                  })}
                </div>
                <div>Stock: {productDetail.stock}</div>
                <div>
                  Rating: {productDetail.stats.averageRating}(
                  {productDetail.stats.rating} rating)
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="fs-1 fw-bold">{productDetail.price.text_idr}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;

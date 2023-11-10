import React, {useState, useEffect} from "react";
import {Button, Col, Container, Row, Pagination} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import products from "../../utils/data.json";
import {StarFill, List, Grid} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import ButtonChange from "../../components/button/ButtonChange";

function ProductPage() {
  const [toggleView, setToggleView] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Untuk mengubah tampilan menjadi box atau list
  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  const handleSortAndFilter = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue.startsWith("sort")) {
      // Pengguna memilih opsi pengurutan
      setSortOrder(selectedValue.split("_")[1]);
    } else if (selectedValue.startsWith("filter")) {
      // Pengguna memilih opsi filter
      setFilterOption(selectedValue.split("_")[1]);
    } else if (selectedValue.startsWith("perPage")) {
      setProductsPerPage(parseInt(selectedValue.split("_")[1], 10));
      setCurrentPage(1);
    }
  };

  const paginate = (array, currentPage, productsPerPage) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return array.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const sortProducts = (array, order) => {
      return array.slice().sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (order === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    };

    const filterProducts = (array, filter) => {
      if (filter === "all") {
        return array;
      } else if (filter === "max") {
        return array.slice().sort((a, b) => b.stock - a.stock);
      } else {
        return array.slice().sort((a, b) => a.stock - b.stock);
      }
    };

    const filteredAndSortedProducts = filterProducts(
      sortProducts([...products.data], sortOrder),
      filterOption
    );

    const paginatedProducts = paginate(
      filteredAndSortedProducts,
      currentPage,
      productsPerPage
    );

    setSortedProducts(paginatedProducts);
  }, [sortOrder, filterOption, productsPerPage, currentPage]);

  const totalPages = Math.ceil(products.data.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((nextPage) => nextPage + 1);
    }
  };

  return (
    <div className="products-app">
      <Container>
        <Row className="mb-5 border px-4 py-2 justify-content-between">
          <Col md={2} className="d-flex align-items-center mb-2 mb-md-0">
            <span className="me-2">Tampilan:</span>
            <ButtonChange
              onClick={handleToggleView}
              onHandleChange={toggleView}
              icon1={<Grid size={12} color="#000" />}
              icon2={<List size={12} color="#000" />}
            />
          </Col>
          <Col md={2} className="d-flex align-items-center mb-2 mb-md-0">
            <span className="me-2">Sort</span>
            <Form.Select
              aria-label="Sort and Filter"
              onChange={handleSortAndFilter}
            >
              <option value="filter_all">All</option>
              <option value="sort_asc">A - Z</option>
              <option value="sort_desc">Z - A</option>
              <option value="filter_max">Stock (Max)</option>
              <option value="filter_min">Stock (Min)</option>
            </Form.Select>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <span className="me-2">Show:</span>
            <Form.Select
              aria-label="Products per Page"
              onChange={handleSortAndFilter}
            >
              <option value="perPage_10">10</option>
              <option value="perPage_15">15</option>
              <option value="perPage_20">20</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="overflow-hidden products-container">
          {sortedProducts.map((datas, i) => (
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
                  <Card.Header>{datas.name}</Card.Header>
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
              )}
            </Col>
          ))}
        </Row>
        <Row className="mb-5 border px-4 py-2 justify-content-between">
          <Col className="d-flex align-items-center mb-2 mb-md-0">
            <Pagination>
              <Pagination.Prev
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              {Array.from({length: totalPages}).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
          <Col className="d-flex align-items-center mb-2 mb-md-0">
            Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
            {Math.min(currentPage * productsPerPage, products.data.length)} of{" "}
            {products.data.length} items
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductPage;

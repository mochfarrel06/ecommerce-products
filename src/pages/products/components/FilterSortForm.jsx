import React from "react";
import ButtonChange from "../../../components/button/ButtonChange";
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function FilterSortForm({
  handleToggleView,
  toggleView,
  icon1,
  icon2,
  handleSortAndFilter,
  filterOption,
}) {
  return (
    <Row className="mb-5 border px-4 py-2 justify-content-between">
      <Col md={2} className="d-flex align-items-center mb-2 mb-md-0">
        <span className="me-2">Tampilan:</span>
        <ButtonChange
          onClick={handleToggleView}
          onHandleChange={toggleView}
          icon1={icon1}
          icon2={icon2}
        />
      </Col>
      <Col md={2} className="d-flex align-items-center mb-2 mb-md-0">
        <span className="me-2">Sort</span>
        <Form.Select
          aria-label="Filter"
          onChange={handleSortAndFilter}
          value={`filter_${filterOption}`}
        >
          <option value="filter_all">Show All</option>
          <option value="filter_maxRatingMaxStock">
            Rating Tertinggi dan Stok Terbanyak
          </option>
          <option value="filter_maxRatingMinStock">
            Rating Tertinggi dan Stok Terendah
          </option>
        </Form.Select>
      </Col>
      <Col md={2} className="d-flex align-items-center">
        <span className="me-2">Show:</span>
        <Form.Select
          aria-label="Products per Page"
          onChange={handleSortAndFilter}
        >
          <option value="perPage_10">10</option>
          <option value="perPage_20">20</option>
          <option value="perPage_30">30</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default FilterSortForm;

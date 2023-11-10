import React from "react";
import {Modal, Form, Button} from "react-bootstrap";

const SearchModal = ({showModal, handleClose, handleSearch}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSearch}>
          <Form.Control type="text" placeholder="Search..." />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;

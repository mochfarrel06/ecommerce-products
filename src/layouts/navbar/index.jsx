import React from "react";
import {Navbar, Container, Nav, Form, Button} from "react-bootstrap";
import {navLinks} from "../../utils/index";
import {NavLink} from "react-router-dom";
import {Search} from "react-bootstrap-icons";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand href="#home">Unitech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navLinks.map((link) => (
              <div className="nav-link" key={link.id}>
                <NavLink to={link.path}>{link.text}</NavLink>
              </div>
            ))}
          </Nav>
          <Search size={20} color="#fff" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

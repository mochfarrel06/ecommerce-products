import React, {useState} from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import {NavLink, useNavigate} from "react-router-dom";
import {navLinks} from "../../utils/index";

function NavbarComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      // Navigasi ke halaman pencarian dengan keyword
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
    } else {
      // Jika keyword kosong, navigasi ke halaman tanpa parameter pencarian
      navigate("/products");
    }
  };

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
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              <Search size={20} color="#fff" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

import React, {useState} from "react";
import {Container, Table, Button, Row, Col} from "react-bootstrap";
import {SortUp, SortDown, BarChartFill} from "react-bootstrap-icons";
import {BsTable} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import products from "../../utils/data.json";

function TablesPage() {
  const [showLowStock, setShowLowStock] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [filterOption, setFilterOption] = useState("all");

  const sortedProducts = showLowStock
    ? products.data.sort((a, b) => a.stock - b.stock)
    : products.data.sort((a, b) => b.stock - a.stock);

  const toggleView = () => {
    setShowTable(!showTable);
  };

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  const filteredProducts = (array) => {
    switch (filterOption) {
      case "maxRatingMaxStock":
        return array.slice().sort((a, b) => {
          if (b.stats.averageRating !== a.stats.averageRating) {
            return b.stats.averageRating - a.stats.averageRating;
          } else {
            return b.stock - a.stock;
          }
        });
      case "maxRatingMinStock":
        return array.slice().sort((a, b) => {
          if (b.stats.averageRating !== a.stats.averageRating) {
            return b.stats.averageRating - a.stats.averageRating;
          } else {
            return a.stock - b.stock;
          }
        });
      default:
        return array;
    }
  };

  const filteredAndSortedProducts = filteredProducts(sortedProducts).slice(
    0,
    10
  );

  return (
    <Container className="products-app">
      <Row className="border px-4 py-2">
        <Col md={2}>
          <span className="me-2">Sort:</span>
          <Button
            onClick={() => handleFilterChange("maxRatingMaxStock")}
            variant={filterOption === "maxRatingMaxStock"}
            className="me-2"
          >
            <SortUp size={12} color="#000" />
          </Button>
          <Button
            onClick={() => handleFilterChange("maxRatingMinStock")}
            variant={filterOption === "maxRatingMinStock"}
          >
            <SortDown size={12} color="#000" />
          </Button>
        </Col>
        <Col md={2} className="">
          <span className="me-2">Tampilan:</span>
          <Button onClick={toggleView}>
            {showTable ? (
              <BsTable size={12} color="#000" />
            ) : (
              <BarChartFill size={12} color="#000" />
            )}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {showTable ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.map((product, index) => (
                  <tr key={product.product_id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price.text_idr}</td>
                    <td>{product.stock}</td>
                    <td>{product.stats.averageRating}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <ResponsiveContainer width="100%" height={500} className="mt-5">
              <BarChart
                data={filteredAndSortedProducts}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TablesPage;

import React, {useState} from "react";
import {Container, Table, Button, Row, Col} from "react-bootstrap";
import {SortUp, SortDown} from "react-bootstrap-icons";
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
import ButtonChange from "../../components/button/ButtonChange";

function TablesPage() {
  const [showLowStock, setShowLowStock] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const sortedProducts = showLowStock
    ? products.data.sort((a, b) => a.stock - b.stock)
    : products.data.sort((a, b) => b.stock - a.stock);

  const topStockProducts = sortedProducts.slice(0, 10);

  const toggleView = () => {
    setShowTable(!showTable);
  };

  return (
    <Container className="products-app">
      <Row className="mb-5 border px-4 py-2">
        <Col>
          {/* <Button onClick={() => setShowLowStock(!showLowStock)}>
            {showLowStock ? (
              <SortDown size={12} color="#000" />
            ) : (
              <SortUp size={12} color="#000" />
            )}
          </Button> */}
          <ButtonChange
            onClick={() => setShowLowStock(!showLowStock)}
            onHandleChange={showLowStock}
            icon1={<SortDown size={12} color="#000" />}
            icon2={<SortUp size={12} color="#000" />}
          />
          <Button onClick={toggleView}>
            {showTable ? "Table" : "Diagram"}
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
                </tr>
              </thead>
              <tbody>
                {topStockProducts.map((product, index) => (
                  <tr key={product.product_id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price.text_idr}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={topStockProducts}
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

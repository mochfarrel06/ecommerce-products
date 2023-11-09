import React, {useState} from "react";
import {Container, Table, Button} from "react-bootstrap";
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

  const sortedProducts = showLowStock
    ? products.data.sort((a, b) => a.stock - b.stock)
    : products.data.sort((a, b) => b.stock - a.stock);

  const topStockProducts = sortedProducts.slice(0, 10);

  const toggleView = () => {
    setShowTable(!showTable);
  };

  if (showTable) {
    return (
      <Container className="products-app">
        <Button onClick={() => setShowLowStock(!showLowStock)}>
          {showLowStock
            ? "Tampilkan Stok Terbanyak"
            : "Tampilkan Stok Terendah"}
        </Button>
        <Button onClick={toggleView}>Tampilkan Diagram</Button>
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
      </Container>
    );
  } else {
    return (
      <Container className="products-app">
        <Button onClick={() => setShowLowStock(!showLowStock)}>
          {showLowStock
            ? "Tampilkan Stok Terbanyak"
            : "Tampilkan Stok Terendah"}
        </Button>
        <Button onClick={toggleView}>Tampilkan Tabel</Button>
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
      </Container>
    );
  }
}

export default TablesPage;

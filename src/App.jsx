import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home";
import ProductPage from "./pages/products";
import NavbarComponent from "./layouts/navbar";
import FooterComponent from "./layouts/footer";
import TablesPage from "./pages/tables";
import ProductDetail from "./pages/products/components/ProductDetail";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productsId" element={<ProductDetail />} />
        <Route path="/tables" element={<TablesPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;

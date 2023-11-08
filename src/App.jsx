import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home";
import ProductPage from "./pages/products";
import NavbarComponent from "./layouts/navbar";
import FooterComponent from "./layouts/footer";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home";
import ProductPage from "./pages/products";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;

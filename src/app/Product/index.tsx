import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Details";
import ProductHome from "./Home";

export default function Product() {
  return (
    <Routes>
      <Route path="/" element={<ProductHome />} />
      <Route path="/:id" element={<ProductDetails />} />
    </Routes>
  );
}

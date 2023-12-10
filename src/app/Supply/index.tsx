import { Routes, Route } from "react-router-dom";
import SupplyDetails from "./Details";
import SupplyHome from "./Home";

export default function Supply() {
  return (
    <Routes>
      <Route path="/" element={<SupplyHome />} />
      <Route path="/:id" element={<SupplyDetails />} />
    </Routes>
  );
}

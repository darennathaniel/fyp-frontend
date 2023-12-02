import { Routes, Route } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyHome from "./Home";

export default function Company() {
  return (
    <Routes>
      <Route path="/" element={<CompanyHome />} />
      <Route path="/:owner" element={<CompanyDetails />} />
    </Routes>
  );
}

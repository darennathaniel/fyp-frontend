import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function SSO() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

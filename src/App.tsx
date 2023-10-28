import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./globals.css";
import { Home } from "./app/Home";
import SSO from "./app/SSO";
import NotFoundPage from "./app/NotFoundPage";
import NavbarApp from "./components/NavbarApp";

export default function App() {
  return (
    <div className="bg-zinc-950 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/sso/*" element={<SSO />} />
          <Route element={<NavbarApp />}>
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<Home />} />
            <Route path="/2" element={<Home />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

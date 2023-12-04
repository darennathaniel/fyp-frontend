import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./globals.css";
import Home from "./app/Home";
import SSO from "./app/SSO";
import NotFoundPage from "./app/NotFoundPage";
import NavbarApp from "./components/NavbarApp";
import Company from "./app/Company";
import Supply from "./app/Supply";
import { Toaster } from "./components/ui/toaster";
import ErrorPopup from "./components/ErrorPopup";
import Loading from "./components/Loading";
import Profile from "./app/Profile";

export default function App() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <ErrorPopup />
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/sso/*" element={<SSO />} />
          <Route element={<NavbarApp />}>
            <Route path="/" element={<Home />} />
            <Route path="/company/*" element={<Company />} />
            <Route path="/supply" element={<Supply />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

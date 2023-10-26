import { useIncrement } from "./hooks/useIncrement";
import { useAppSelector } from "./hooks/useAppSelector";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./globals.css";
import { Home } from "./app/Home";
import SSO from "./app/SSO";
import NotFoundPage from "./app/NotFoundPage";

export default function App() {
  // const increment = useIncrement();
  // const counter = useAppSelector((state) => state.counter.counter);
  return (
    // <div>
    //   {counter}
    //   <button onClick={() => increment()}>+</button>
    // </div>
    <div className="bg-zinc-950 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sso/*" element={<SSO />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

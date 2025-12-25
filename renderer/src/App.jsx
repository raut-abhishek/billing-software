import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Billing from "./routes/Billing";
import Preview from "./routes/Preview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/preview/:type" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

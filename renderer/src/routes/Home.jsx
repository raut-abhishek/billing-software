import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import Home from "./routes/Home";
import Billing from "./routes/Billing";
import Preview from "./routes/Preview";
import Items from "./routes/Items";
import Customers from "./routes/Customers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* App Shell */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/items" element={<Items />} />
          <Route path="/customers" element={<Customers />} />
        </Route>

        {/* Preview outside layout */}
        <Route path="/preview/:type" element={<Preview />} />

      </Routes>
    </BrowserRouter>
  );
}

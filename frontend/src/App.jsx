import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instruments from "./pages/Instruments";
import PlaceOrder from "./pages/PlaceOrder";
import Portfolio from "./pages/Portfolio";
import Trades from "./pages/Trades";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Instruments />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trades" element={<Trades />} />
      </Routes>
    </BrowserRouter>
  );
}

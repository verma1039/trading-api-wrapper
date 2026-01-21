import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Instruments from "./pages/Instruments";
import Portfolio from "./pages/Portfolio";
import Trades from "./pages/Trades";
import PlaceOrder from "./pages/PlaceOrder";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-left">
            <h1 className="logo">📊 Trading Simulator</h1>
          </div>

          <div className="nav-links">
            <NavLink to="/" end className="nav-link">
              Market
            </NavLink>

            <NavLink to="/portfolio" className="nav-link">
              Portfolio
            </NavLink>

            <NavLink to="/trades" className="nav-link">
              Trades
            </NavLink>

            <NavLink to="/order" className="nav-link">
              Buy / Sell
            </NavLink>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Instruments />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

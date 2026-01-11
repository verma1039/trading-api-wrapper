import { useEffect, useState } from "react";
import { getPortfolio } from "../api/portfolio";

function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPortfolio().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div>
      <h2>Portfolio</h2>
      <p>Balance: ₹{Math.round(data.balance)}</p>

      <ul>
        {Object.entries(data.holdings).map(([symbol, h]) => (
          <li key={symbol}>
            {symbol} — Qty: {h.quantity}, Avg: {h.avgPrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;

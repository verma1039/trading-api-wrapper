import { useEffect, useState } from "react";
import { getTrades } from "../api/trades";

function Trades() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    getTrades().then(res => setTrades(res.data));
  }, []);

  return (
    <div>
      <h2>Trades</h2>
      <ul>
        {trades.map(t => (
          <li key={t.tradeId}>
            {t.side} {t.quantity} {t.symbol} @ {t.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trades;

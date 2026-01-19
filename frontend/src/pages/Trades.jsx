import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Trades() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    api.get("/trades").then(res => setTrades(res.data.items));
  }, []);

  return (
    <div>
      <h2>Trade History</h2>

      {trades.map(t => (
        <div key={t.tradeId}>
          {t.timestamp} | {t.symbol} | {t.side} | Qty {t.quantity} |
          Price {t.price} | PnL {t.realizedPnL}
        </div>
      ))}
    </div>
  );
}

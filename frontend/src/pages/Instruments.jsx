import { useEffect, useState } from "react";
import api from "../api/axios";
import useLivePrices from "../hooks/useLivePrices";

function Instruments() {
  const [items, setItems] = useState([]);
  const livePrices = useLivePrices();

  useEffect(() => {
    api
      .get("/instruments", { params: { page: 1, limit: 50 } })
      .then(res => {
        setItems(res.data.items || []);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <div>
      <h2>Instruments</h2>

      <ul>
        {items.map(i => (
          <li key={i.symbol}>
            {i.symbol} — {i.exchange} —{" "}
            {livePrices[i.symbol] !== undefined
              ? livePrices[i.symbol]
              : "—"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Instruments;

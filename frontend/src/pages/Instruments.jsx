import { useEffect, useState } from "react";
import api from "../api/axios";
import useLivePrices from "../hooks/useLivePrices";

export default function Instruments() {
  const [items, setItems] = useState([]);
  const livePrices = useLivePrices();

  useEffect(() => {
    api.get("/instruments?limit=50").then(res => {
      setItems(res.data.items);
    });
  }, []);

  return (
    <div>
      <h2>Market Instruments</h2>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Exchange</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.symbol}>
              <td>{i.symbol}</td>
              <td>{i.exchange}</td>
              <td>
                {livePrices[i.symbol]?.toFixed(2) ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

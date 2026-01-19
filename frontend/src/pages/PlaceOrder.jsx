import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PlaceOrder() {
  const [instruments, setInstruments] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/instruments")
      .then(res => setInstruments(res.data.items))
      .catch(() => setStatus("Failed to load instruments"));
  }, []);

  const placeOrder = async () => {
    try {
      setStatus("Placing order...");
      await api.post("/orders", { symbol, side, quantity });
      setStatus("Order executed successfully");
    } catch (err) {
      setStatus(err.response?.data?.detail || "Order failed");
    }
  };

  return (
    <div>
      <h2>Place Order</h2>

      <select value={symbol} onChange={e => setSymbol(e.target.value)}>
        <option value="">Select Symbol</option>
        {instruments.map(i => (
          <option key={i.symbol} value={i.symbol}>
            {i.symbol}
          </option>
        ))}
      </select>

      <select value={side} onChange={e => setSide(e.target.value)}>
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />

      <button onClick={placeOrder}>Submit</button>

      {status && <p>{status}</p>}
    </div>
  );
}

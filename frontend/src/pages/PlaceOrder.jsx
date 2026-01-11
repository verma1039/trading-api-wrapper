import { useEffect, useState } from "react";
import api from "../api/axios";
import { placeOrder } from "../api/orders";

function PlaceOrder() {
  const [instruments, setInstruments] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/instruments", { params: { page: 1, limit: 50 } })
      .then(res => {
        const items = res.data?.items || [];
        setInstruments(items);
        if (items.length > 0) setSymbol(items[0].symbol);
      })
      .catch(() => setInstruments([]));
  }, []);

  const submit = async () => {
    try {
      const res = await placeOrder(symbol, side, Number(quantity));
      setMessage(
        `Executed ${side} ${quantity} ${symbol} @ ${res.data.trade.price}`
      );
    } catch (e) {
      setMessage(e.response?.data?.detail || "Order failed");
    }
  };

  return (
    <div>
      <h2>Place Order</h2>

      <select value={symbol} onChange={e => setSymbol(e.target.value)}>
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
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={submit}>Submit</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PlaceOrder;

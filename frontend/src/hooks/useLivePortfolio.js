import { useEffect, useState } from "react";

export default function useLivePrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/prices");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const map = {};
      data.forEach(p => {
        map[p.symbol] = p.price;
      });
      setPrices(map);
    };

    ws.onerror = () => {
      console.error("Price WebSocket error");
    };

    return () => ws.close();
  }, []);

  return prices;
}

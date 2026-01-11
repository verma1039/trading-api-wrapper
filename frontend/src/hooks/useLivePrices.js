import { useEffect, useState } from "react";

export default function useLivePrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/prices");

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // supports both test + real payloads
      if (Array.isArray(data)) {
        const map = {};
        data.forEach(p => {
          map[p.symbol] = p.price;
        });
        setPrices(map);
      }
    };

    ws.onerror = (e) => {
      console.error("WS error", e);
    };

    return () => ws.close();
  }, []);

  return prices;
}

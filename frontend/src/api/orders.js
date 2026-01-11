import api from "./axios";

export const placeOrder = (symbol, side, quantity) =>
  api.post("/orders", { symbol, side, quantity });

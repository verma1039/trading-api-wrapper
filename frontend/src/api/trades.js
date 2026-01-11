import api from "./axios";

export const getTrades = () => api.get("/trades");

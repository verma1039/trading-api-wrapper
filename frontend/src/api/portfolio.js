import api from "./axios";

export const getPortfolio = () => api.get("/portfolio");

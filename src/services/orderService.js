import API from "./api";

export const placeOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
export const downloadReceipt = async (id) => {
  const response = await API.get(`/orders/${id}/receipt`, {
    responseType: "blob", // PDF blob milega
  });
  return response.data;
};

export const cancelOrder = (id) => API.put(`/orders/${id}/cancel`);
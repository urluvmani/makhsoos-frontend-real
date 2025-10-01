import API from "./api";

export const adminLogin = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  localStorage.setItem("adminToken", data.token);
  return data;
};

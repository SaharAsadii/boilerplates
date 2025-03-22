import axios from "axios";

const API_URL = "http://localhost:3000/items";

export const getItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getItem = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createItem = async (item: {
  name: string;
  description: string;
}) => {
  const res = await axios.post(API_URL, item);
  return res.data;
};

export const updateItem = async (
  id: string,
  data: { name?: string; description?: string }
) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteItem = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

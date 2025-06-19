import { API_BASE_URL } from "@/config";
import axios from "axios";
import { getUserAddress } from "./storage";

export const postTransaction = async (transaction: any) => {
  await axios.post(`${API_BASE_URL}/api/transactions`, transaction);
};

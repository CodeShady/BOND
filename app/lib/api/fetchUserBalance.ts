import { API_BASE_URL } from "@/config";
import axios from "axios";

export const fetchUserBalance = async (walletAddress: string): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/api/balance/${walletAddress}`);
  if (!response.data.balance) throw new Error("Unable to fetch balance");
  return response.data.balance;
};
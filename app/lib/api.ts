import { API_BASE_URL } from "@/config";
import { NewTransaction } from "@/types";
import axios from "axios";

export const postTransaction = async (transaction: NewTransaction): Promise<boolean> => {
  const res = await axios.post(`${API_BASE_URL}/api/transactions`, transaction);
  return res.status === 201;
};

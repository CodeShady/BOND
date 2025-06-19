import { API_BASE_URL } from "@/config";
import { NewTransaction } from "@/types";
import axios from "axios";

export const postTransaction = async (transaction: NewTransaction) => {
  await axios.post(`${API_BASE_URL}/api/transactions`, transaction);
};

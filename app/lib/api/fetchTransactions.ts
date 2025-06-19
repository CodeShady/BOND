import { API_BASE_URL } from "@/config";
import { Transaction } from "@/types";
import axios from "axios";

export const fetchConfirmedTransactions = async (walletAddress: string): Promise<Transaction[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/transactions/${walletAddress}`);
  if (!response.data.transactions) throw new Error("Unable to fetch confirmed transactions");
  return response.data.transactions;
};

export const fetchPendingTransactions = async (walletAddress: string): Promise<Transaction[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/pending/${walletAddress}`);
  if (!response.data.transactions) throw new Error("Unable to fetch pending transactions");
  return response.data.transactions;
};

import axios from "axios";
import urlJoin from "url-join";
import { CORE_API_URL } from "./env";
import { Block } from "./types";

export const fetchAllTransactions = async () => {
  const res = await axios.get<Block[]>(urlJoin(CORE_API_URL, "/api/blocks/all"));
  return res.data.flatMap(block => block.transactions.reverse());
};

export const fetchTransactions = async (walletAddress: string) => {
  const res = await axios.get(urlJoin(CORE_API_URL, "/api/transactions/", walletAddress));
  return res.data.transactions.sort(
    (a: { timestamp: string }, b: { timestamp: string }) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const fetchBalance = async (walletAddress: string) => {
  const res = await axios.get(urlJoin(CORE_API_URL, "/api/balance/", walletAddress));
  return res.data.balance;
};
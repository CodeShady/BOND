import { MAX_TIME_DRIFT_MS } from "../config";

export const validateISOStringTimestamp = (timestampString: string, lastBlockTimestamp: string) => {
  const timestamp = Date.parse(timestampString);
  if (isNaN(timestamp)) throw new Error("Invalid timestamp format");

  const now = Date.now();

  if (Math.abs(now - timestamp) > MAX_TIME_DRIFT_MS) {
    throw new Error("Timestamp too far from server time");
  }

  if (timestamp <= Date.parse(lastBlockTimestamp)) {
    throw new Error("Timestamp must be greater than previous block");
  }
};

export const isValidTimestamp = (timestamp: any): boolean => {
  // Check if tx.timestamp is a valid ISO string
  if (typeof timestamp !== "string") return false;
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return false;
  if (timestamp !== date.toISOString()) return false;
  return true;
};
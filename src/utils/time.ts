export const MAX_TIME_DRIFT_MS = 10 * 60 * 1000; // 10 minutes

export const validateISOStringTimestamp = async (timestampString: string, lastBlockTimestamp: string) => {
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
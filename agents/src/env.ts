import dotenv from "dotenv";

// Env
dotenv.config();

// Configuration
export const CORE_API_URL = process.env.CORE_API_URL || "http://localhost:7123";
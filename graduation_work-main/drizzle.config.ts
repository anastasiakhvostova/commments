import "dotenv/config";
import type { Config } from "drizzle-kit";


const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const url = new URL(DATABASE_URL);

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port || "5432"),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), 
    ssl: "require", 
  },
} satisfies Config;

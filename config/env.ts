const requiredEnvs = [
  "JWT_SECRET",
  "DATABASE_URL",
  "PORT",
  "NODE_ENV",
] as const;

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
}

export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
};

import { config } from "dotenv";

config();

function getEnvVariable(name: string, defaultValue?: string): string {
    const value = process.env[name] || defaultValue;
    if (!value) {
      throw new Error(`La variable de entorno ${name} no está definida.`);
    }
    return value;
  }

  export const DB_PASSWORD = getEnvVariable("DB_PASSWORD");
  export const DB_HOST = getEnvVariable("DB_HOST");
  export const DB_USER = getEnvVariable("DB_USER");
  export const DB_DEV_NAME = getEnvVariable("DB_DEV_NAME");
  export const DB_PORT = getEnvVariable("DB_PORT", "3306");
  export const PORT = getEnvVariable("PORT", "3000");
  export const DB_TEST_NAME = getEnvVariable("DB_TEST_NAME", "test_db");
  export const NODE_ENV = process.env.NODE_ENV || "development";
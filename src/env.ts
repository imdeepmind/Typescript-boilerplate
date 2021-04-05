import * as dotenv from 'dotenv';
import * as path from 'path';

import { getOsEnv, getPortNumber, toBool } from "./utils/env";

dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

interface EnvConfig {
    node: string,
    isProduction: boolean,
    isDevelopment: boolean,
    isTest: boolean,
    app: {
        name: string,
        version: string,
        description: string,
        host: string,
        port: number,
        banner: boolean,
        schema: string
        routePrefix: string
    },
    log: {
        level: string,
        combinedOutput: string
        errorOutput: string
    },
    db: {
        connectionString: string
    }
}

const env: EnvConfig = {
    node: getOsEnv("NODE_ENV") || "development",
    isProduction: getOsEnv("NODE_ENV") === "production",
    isDevelopment: getOsEnv("NODE_ENV") === "development",
    isTest: getOsEnv("NODE_ENV") === "test",
    app: {
        name: getOsEnv("APP_NAME") || "TypeScript Application",
        version: getOsEnv("APP_VERSION") || "1.0.0",
        description: getOsEnv("APP_DESCRIPTION") || "Typescript based RESTful API",
        host: getOsEnv("APP_HOST") || "localhost",
        port: getPortNumber(),
        banner: toBool(getOsEnv("APP_BANNER") || "true"),
        schema: getOsEnv("APP_SCHEMA") || "http",
        routePrefix: getOsEnv("APP_ROUTE_PREFIX") || "/api/v1"
    },
    log: {
        level: getOsEnv('LOG_LEVEL') || "all",
        combinedOutput: getOsEnv('LOG_OUTPUT_ALL') || "logging.log",
        errorOutput: getOsEnv('LOG_OUTPUT_OUTPUT') || "error.log",
    },
    db: {
        connectionString: getOsEnv("MONGO_URI", false)
    }
}

export default env;
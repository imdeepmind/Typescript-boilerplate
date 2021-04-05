import { Express, Router } from "express";
import * as http from "http";

interface EnvConfigInterface {
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

interface LoggerInterface {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

interface RegisteredUrlsInterface {
    method: string,
    path: string
}

interface MakeRouteInterface {
    registeredURLs: RegisteredUrlsInterface[],
    router: Router,
    registerUrl(method: string, path: string, func: any): void,
}


interface ServerInterface {
    app: Express,
    server: http.Server,
    start(): void
    registerRoute(basePath: string, router: MakeRouteInterface): void
}


export {
    EnvConfigInterface, LoggerInterface, RegisteredUrlsInterface, MakeRouteInterface, ServerInterface
}
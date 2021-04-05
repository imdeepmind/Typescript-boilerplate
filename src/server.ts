import * as http from "http";
import express, { Application, Express, Request, Response, NextFunction } from "express";


import banner from "./utils/banner";
import { Logger, LoggerInterface } from "./utils/logger";
import env from "./env";

interface ServerInterface {
    app: Express,
    server: http.Server,
    start(): void
    registerRoute(basePath: string, method: Application): void
}

interface RegisteredUrlsInterface {
    method: string,
    path: string
}

class Server {
    private readonly _app: Express;
    private _logger: LoggerInterface;
    private _server!: http.Server;
    private _addedUrls: RegisteredUrlsInterface[] = [];

    private configureMiddleware() {
        // CORS
        this.app.use(function (req: Request, res: Response, next: NextFunction):void {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
            next();
        });

        // Logging incoming routes
        this.app.use("*", (req: Request, res: Response, next: NextFunction): void => {
            this._logger.info(`Incoming request: ${req.method} ${req.url}`);
            next();
        });
    }

    constructor() {
        this._app = express();
        this._logger = new Logger();

        this.configureMiddleware();

        this._addedUrls.push({
            method: "GET",
            path: "test path"
        })
    }

    get app(): Express {
        return this._app;
    }

    get server(): http.Server {
        return this._server;
    }

    public start(): void {
        this._server = this._app.listen(env.app.port, () => {
            banner(this._addedUrls);
        });
    }

    public registerRoute(basePath: string, method: Application): void {
        this.app.use(basePath, method)
    }
}

export {
    Server, ServerInterface
};
import * as http from 'http';
import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import banner from '../utils/banner';
import { Logger } from '../utils/logger';
import { MakeRouterInterface, RegisteredUrlsInterface, LoggerInterface } from '../interfaces';
import env from '../env';

class Server {
    private readonly _app: Express;
    private _logger: LoggerInterface;
    private _server!: http.Server;
    private _addedUrls: RegisteredUrlsInterface[] = [];

    private configureMiddleware() {
        // CORS
        this.app.use(function (req: Request, res: Response, next: NextFunction): void {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization',
            );
            next();
        });

        // Logging incoming routes
        this.app.use(
            '*',
            async (req: Request, _: Response, next: NextFunction): Promise<void> => {
                this._logger.info(`Incoming request: ${req.method} ${req.url}`);
                next();
            },
        );
    }

    private configureSwagger() {
        const swaggerDefinition = {
            openapi: '3.0.0',
            info: {
                title: env.app.name,
                version: env.app.version,
                description: env.app.description,
            },
        };

        const options = {
            swaggerDefinition,
            // Paths to files containing OpenAPI definitions
            apis: ['src/*.ts'],
        };

        const swaggerSpec = swaggerJSDoc(options);

        this._app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this._addedUrls.push({
            method: 'get',
            path: '/docs',
        });
    }

    constructor() {
        this._app = express();
        this._logger = new Logger();

        this.configureMiddleware();
        this.configureSwagger();
    }

    get app(): Express {
        return this._app;
    }

    get server(): http.Server {
        return this._server;
    }

    public start(): void {
        // Handling invalid routes
        this._app.all(
            '*',
            async (req: Request, res: Response): Promise<Response> => {
                this._logger.info(`Incoming route: ${req.method} ${req.url}`);
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Invalid Route',
                });
            },
        );

        this._server = this._app.listen(env.app.port, () => {
            banner(this._addedUrls);
        });
    }

    public registerRoute(basePath: string, router: MakeRouterInterface): void {
        const registeredUrls: RegisteredUrlsInterface[] = router.registeredURLs;

        registeredUrls.forEach((item: RegisteredUrlsInterface) => {
            this._addedUrls.push({
                method: item.method,
                path: env.app.routePrefix + basePath + item.path,
            });
        });

        this._app.use(env.app.routePrefix + basePath, router.router);
    }
}

export { Server };

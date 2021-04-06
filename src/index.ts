import { Request, Response } from 'express';
import { Server, MakeRouter } from './server';
import { ServerInterface, MakeRouterInterface } from './interfaces';

const server: ServerInterface = new Server();
const router: MakeRouterInterface = new MakeRouter();

/**
 * @openapi
 * /api/v1/test/hello-world:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.registerUrl(
    'get',
    '/hello-world',
    async (req: Request, res: Response): Promise<Response | void> => {
        return res.send('Hello World');
    },
);

server.registerRoute('/test', router);
server.start();

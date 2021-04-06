import { Request, Response } from 'express';
import { MakeRouter } from '../../server';
import { MakeRouterInterface } from '../../interfaces';

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

export default router;

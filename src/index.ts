import { Request, Response } from "express";
import { Server, MakeRouter } from "./server";
import { ServerInterface, MakeRouterInterface } from "./interfaces";

const server: ServerInterface = new Server();
const router: MakeRouterInterface = new MakeRouter();

router.registerUrl("get", "/hello-world", async (req: Request, res: Response): Promise<Response | void> => {
    return res.send("Hello World");
});

server.registerRoute("/test", router);
server.start();

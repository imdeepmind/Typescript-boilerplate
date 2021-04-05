import { Request, Response } from "express";
import { Server } from "./server";
import { MakeRoute } from "./utils/routes";
import { ServerInterface, MakeRouteInterface } from "./interfaces";

const server: ServerInterface = new Server();
const router: MakeRouteInterface = new MakeRoute();

router.registerUrl("get", "/hello-world", async (req: Request, res: Response): Promise<Response | void> => {
    return res.send("Hello World");
});

server.registerRoute("/test", router);
server.start();

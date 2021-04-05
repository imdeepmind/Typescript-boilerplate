import { Request, Response } from "express";
import { Server, ServerInterface } from "./server";
import { MakeRoute, MakeRouteInterface } from "./utils/routes";

const server: ServerInterface = new Server();
const router: MakeRouteInterface = new MakeRoute();

router.registerUrl("get", "/hello-world", async (req: Request, res: Response): Promise<Response | void> => {
    return res.send("Hello World");
});


server.registerRoute("/test", router);


server.start();

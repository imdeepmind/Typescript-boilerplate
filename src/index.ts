import { Server } from './server';
import { ServerInterface } from './interfaces';

// Importing Routes
import { v1Routes } from './routes';

const server: ServerInterface = new Server();

// Registering router to this application
const { helloRouter } = v1Routes;
server.registerRoute('/test', helloRouter);

// Starting the server
server.start();

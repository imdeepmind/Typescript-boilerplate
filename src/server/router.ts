/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

import { RegisteredUrlsInterface } from '../interfaces/index';

class MakeRouter {
    private readonly _router: Router;
    private _registeredURLs: RegisteredUrlsInterface[] = [];

    constructor() {
        this._router = Router();
    }

    get registeredURLs(): RegisteredUrlsInterface[] {
        return this._registeredURLs;
    }

    get router(): Router {
        return this._router;
    }

    public registerUrl(method: string, path: string, func: any): void {
        this._registeredURLs.push({
            method,
            path,
        });

        switch (method) {
            case 'get':
                this._router.get(path, func);
                break;
            case 'post':
                this._router.post(path, func);
                break;
            case 'put':
                this._router.put(path, func);
                break;
            case 'delete':
                this._router.delete(path, func);
                break;
            default:
                throw new Error('Please provide a valid method for building the api');
        }
    }
}

export { MakeRouter };

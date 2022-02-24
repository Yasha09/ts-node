import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import AppError from '@/utils/appError';
import globalErrorHandler from '@/utils//error.controller';
import Controller from '@/utils/interfaces/controller.interface';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.all(
            '*',
            (req: Request, res: Response, next: NextFunction) => {
                next(new AppError(`Can't find ${req.originalUrl} url`, 404));
            }
        );
        this.express.use(globalErrorHandler);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_URL } = process.env;
        mongoose.connect(`${MONGO_URL}`);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default App;

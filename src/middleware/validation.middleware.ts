import { Response, Request, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import AppError from '@/utils/appError';

const catchAsync = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => {
            const errors: string[] = [];
            err.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            next(new AppError(`${errors[0]}`, 400));
        });
    };
};

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return catchAsync(
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            const validationOptions = {
                abortEarly: false,
                allowUnknown: true,
                stripeUnknown: true,
            };
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        }
    );
}

export default validationMiddleware;

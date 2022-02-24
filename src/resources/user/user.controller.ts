import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    private catchAsync = (
        fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
    ) => {
        return (req: Request, res: Response, next: NextFunction) => {
            fn(req, res, next).catch(next);
        };
    };
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.get);
        this.router.post(`${this.path}`, this.create);
    }

    private create = this.catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const { type, label, required, visible } = req.body;
            const user = await this.UserService.create(
                type,
                label,
                required,
                visible
            );
            return res.status(201).json({ user });
        }
    );

    private get = this.catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const users = await this.UserService.get();
            return res.status(200).json({ users });
        }
    );
}

export default UserController;

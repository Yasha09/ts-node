import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.get);
        this.router.post(`${this.path}`, this.create);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { type, label, required, visible } = req.body;
            const user = await this.UserService.create(
                type,
                label,
                required,
                visible
            );
            return res.status(201).json({ user });
        } catch (error) {
            console.log('error ', error);
            next(new HttpException(400, 'Cannot create post'));
        }
    };

    private get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.UserService.get();
            return res.status(200).json({ users });
        } catch (e) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default UserController;

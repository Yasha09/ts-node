import { Router, Response, Request, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.vaildation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private catchAsync = (
        fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
    ) => {
        return (req: Request, res: Response, next: NextFunction) => {
            fn(req, res, next).catch(next);
        };
    };

    private create = this.catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            return res.status(201).json({ post });
        }
    );
}

export default PostController;

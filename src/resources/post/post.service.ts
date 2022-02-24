import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';
import AppError from '@/utils/appError';

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        const post = await this.post.create({ title, body });
        if (!post) {
            throw new AppError("Can't create post ", 400);
        }
        return post;
    }
}

export default PostService;

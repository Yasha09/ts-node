import User from '@/resources/user/user.interface';
import UserModel from '@/resources/user/user.modal';

class UserService {
    private user = UserModel;

    public async create(
        type: string,
        label: string,
        required: boolean,
        visible: boolean
    ): Promise<User> {
        try {
            const user = this.user.create({ type, label, required, visible });
            return user;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    public async get(): Promise<User[]> {
        try {
            const users = await this.user.find();
            return users;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default UserService;

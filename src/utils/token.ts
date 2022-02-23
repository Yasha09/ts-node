import jwt from 'jsonwebtoken';
import Token from '@/utils/interfaces/token.interface';
import User from '@/resources/user/user.interface';

export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) {
                    return reject(err);
                }
                return resolve(payload as Token);
            }
        );
    });
};

export default { verifyToken, createToken };

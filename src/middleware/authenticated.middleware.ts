import { Response, Request, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import UserModal from '@/resources/user/user.modal';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt, { verify } from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || bearer.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorised' });
    }
    const accessToken = bearer.split('Bearer: ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );
    } catch (error) {}
}

export default authenticatedMiddleware;

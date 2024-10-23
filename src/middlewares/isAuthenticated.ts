import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
  adminId: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.user.token;
    
    if (!token) {
      res
        .status(401)
        .json({ message: 'You are not Logged IN!', success: false });
      return;
    }


    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decode) {
      res
        .status(401)
        .json({ message: 'Invalid Token!', success: false });
        return;
    }

    const id = decode.adminId? decode.adminId: decode.userId;
    const role = decode.adminId? "admin" : "user";
    res.cookie('id', id, { httpOnly: true, sameSite: 'strict' });
    res.cookie('role', role, { httpOnly: true, sameSite: 'strict' });
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(401)
        .json({ message: 'You are not Logged IN!', success: false });
      return;
    }

    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

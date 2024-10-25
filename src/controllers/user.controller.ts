import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User, Admin } from '../models/user.model';
import { IUserData } from '../interfaces/user.interface';
import { IAdminData } from '../interfaces/user.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'FalseSecret';

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.body;
    if (key) {
      const { key, password }: IAdminData = req.body;

      const existingAdmin = await Admin.findOne({ key });
      if (existingAdmin) {
        res.status(400).json({ message: 'Admin Already Exists!', success: false });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        key,
        password: hashedPassword,
      });
      await newAdmin.save();

      res.status(201).json({
        message: 'Admin Registered Successfully!',
        success: true,
      });
      return;
    }

    const { name, email, username, password }: IUserData = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User Already Exists!', success: false });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: 'User Registered Successfully!',
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error Registering User', success: false, error });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.body;
    if (key) {
      const { key, password } = req.body;

      const admin = await Admin.findOne({ key });
      if (!admin) {
        res.status(400).json({ message: 'Invalid Credentials!', success: false });
        return;
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid Credentials!', success: false });
        return;
      }

      const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('id', admin._id);
      res.cookie('user', {
          username: admin.key,
          token: token,
          email:"kodium@iiitk.ac.in",
          name:"Kodium Admin",
          role : "admin"
        }, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        
        res.status(200).json({
          message: `Welcome Kodium Admin!`,
          success: true,
          user: {
            username: admin.key,
            token: token,
            email:"kodium@iiitk.ac.in",
            name:"Kodium Admin",
            role : "admin"
          },
        });
      return;
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).json({ message: 'Invalid Credentials!', success: false });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid Credentials!', success: false });
      return;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('id', user._id);

    res.cookie('user', {
        username: user.username,
        name:user.name,
        token : token,
        email:user.email,
        role:"user"
      }, {
        httpOnly: true,
        sameSite: 'strict',
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: `Welcome @${user.username}!`,
        success: true,
        user: {
          username: user.username,
          name:user.name,
          token : token,
          email:user.email,
          role:"user"
        },
      });
      
  } catch (error) {
    res.status(500).json({ message: 'Error Logging In...', success: false, error });
  }
};

const logout = async (_: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('user',{
      httpOnly: true,
      sameSite: 'strict',
      secure:true,
    })
      .json({ message: 'Logged Out Successfully!', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error Logging Out...', success: false });
    console.log(error);
  }
}
const refresh = async (req: Request, res: Response): Promise<void> => {
  try{
    console.log("HI")
    console.log(req.cookies)
    const user = req.cookies.user || {}
    console.log(user)
    res.json(user)
  }
  catch(err){
    res.status(500).send({})
  }
}
export default {
  register,
  login,
  logout,
  refresh
}
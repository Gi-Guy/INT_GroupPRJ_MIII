import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { UserModel } from '../models/user.model';
import { User } from '../types/user.type';

export async function register(req: Request, res: Response) :Promise<void> {
    try {
        const {
            username,
            password,
            gender
        } = req.body
        
        const existing = await UserModel.findOne({ username });
        if (existing) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: User = {
            id: randomUUID(),
            username,
            password: hashedPassword,
            gender,
            registeredAt: Date.now()
        };
        await UserModel.create(newUser);
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure:false,
            sameSite: 'lax'
        });
        res.status(201).json({ message: 'User registered successfully' });

    }
    catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}
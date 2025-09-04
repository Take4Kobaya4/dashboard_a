import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
    password_confirmation: z.string().min(1, 'Password confirmation is required'),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
});
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'メールアドレスは必須です'),
    password: z.string().min(1, 'パスワードは必須です'),
});

export const registerSchema = z.object({
    name: z.string().min(1, '名前を入力してください'),
    email: z.string().min(1, 'メールアドレスを入力してください').email('有効なメールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
    password_confirmation: z.string().min(1, 'パスワード確認を入力してください'),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードとパスワード確認が一致しません',
    path: ['password_confirmation'],
});
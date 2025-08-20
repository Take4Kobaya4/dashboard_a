import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1, '名前を入力してください'),
    email: z.string().min(1, 'メールアドレスを入力してください').email('有効なメールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
    password_confirmation: z.string().min(1, 'パスワード確認を入力してください'),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードとパスワード確認が一致しません',
    path: ['password_confirmation'],
});

export const updateUserSchema = z.object({
    name: z.string().min(1, '名前を入力してください'),
    email: z.string().min(1, 'メールアドレスを入力してください').email('有効なメールアドレスを入力してください'),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
}).refine((data) => {
    if (data.password || data.password_confirmation) {
        return data.password === data.password_confirmation;
    }
    return true;
}, {
    message: 'パスワードとパスワード確認が一致しません',
    path: ['password_confirmation'],    
});
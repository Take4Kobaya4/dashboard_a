import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { cleanupMocks, mockMessage, mockNavigate } from "../../../test/utils/mock-helpers";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { LoginForm } from "./LoginForm";


describe('LoginForm', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        cleanupMocks();
    })

    it('ログインフォームが正しくレンダリングされること', () => {
        render(<LoginForm onSuccess={() => {}}/>)

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
    })

    it('必須フィールドのバリデーションが機能すること', async () => {
        render(<LoginForm onSuccess={() => {}}/>)

        const loginButton = screen.getByRole('button', { name: /login/i });
        await user.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument()
            expect(screen.getByText(/password is required/i)).toBeInTheDocument()
        })
    })

    it('正しい認証情報でログインが成功すること', async () => {
        render(<LoginForm onSuccess={() => {}}/>)

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(loginButton);

        await waitFor(() => {
            expect(mockMessage.success).toHaveBeenCalledWith('ログインに成功しました');
            expect(mockNavigate).toHaveBeenCalledWith('/users');
        })
    })

    it('間違った認証情報でログインが失敗すること', async () => {
        render(<LoginForm onSuccess={() => {}}/>)

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(loginButton);

        await waitFor(() => {
            expect(mockMessage.error).toHaveBeenCalledWith('ログインに失敗しました');
        })
    })

    it('ログイン中にボタンが無効化されること', async () => {
        render(<LoginForm onSuccess={() => {}}/>)

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password');
        await user.click(loginButton);

        expect(loginButton).toBeDisabled();
        expect(screen.getByText(/logging in.../i)).toBeInTheDocument();
    })
})
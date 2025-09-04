import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { cleanupMocks, mockMessage, mockNavigate } from "../../../test/utils/mock-helpers";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { RegisterForm } from "./RegisterForm";


describe('RegisterForm', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        cleanupMocks();
    })

    it('会員登録フォームが正しくレンダリングされること', () => {
        render(<RegisterForm onSuccess={() => {}}/>)

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password confirmation/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
    })

    it('必須フィールドのバリデーションが機能すること', async () => {
        render(<RegisterForm onSuccess={() => {}}/>)

        const registerButton = screen.getByRole('button', { name: /register/i });
        await user.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument()
            expect(screen.getByText(/email is required/i)).toBeInTheDocument()
            expect(screen.getByText(/password is required/i)).toBeInTheDocument()
            expect(screen.getByText(/password confirmation is required/i)).toBeInTheDocument()
        })
    })

    it('パスワード確認のバリデーションが機能すること', async () => {
        render(<RegisterForm onSuccess={() => {}}/>)

        const passwordInput = screen.getByLabelText(/^password$/i);
        const passwordConfirmationInput = screen.getByLabelText(/password confirmation/i);
        await user.type(passwordInput, 'password');
        await user.type(passwordConfirmationInput, 'wrong-password');

        const registerButton = screen.getByRole('button', { name: /register/i });
        await user.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText(/password confirmation does not match/i)).toBeInTheDocument()
        })
    })

    it('正しい情報で会員登録が成功すること', async () => {
        render(<RegisterForm onSuccess={() => {}}/>)

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const passwordConfirmationInput = screen.getByLabelText(/password confirmation/i);
        const registerButton = screen.getByRole('button', { name: /register/i });

        await user.type(nameInput, 'test');
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.type(passwordConfirmationInput, 'password123');
        await user.click(registerButton);

        await waitFor(() => {
            expect(mockMessage.success).toHaveBeenCalledWith('会員登録に成功しました');
            expect(mockNavigate).toHaveBeenCalledWith('/users');
        })
    })
})

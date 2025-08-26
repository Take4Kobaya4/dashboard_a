import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import type { StoryObj, Meta } from "@storybook/react-vite";


const queryClient = new QueryClient();

const meta: Meta<typeof LoginForm> = {
    title: "Auth/LoginForm",
    component: LoginForm,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthProvider>
                        <Story />
                    </AuthProvider>
                </BrowserRouter>
            </QueryClientProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
        onSuccess: () => console.log("Login successful"),
    },
};
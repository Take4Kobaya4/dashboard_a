import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingSpinner } from "./LoadingSpinner";


const meta: Meta<typeof LoadingSpinner> = {
    title: 'Shared/LoadingSpinner',
    component: LoadingSpinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
    args: {
        size: 'default',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};
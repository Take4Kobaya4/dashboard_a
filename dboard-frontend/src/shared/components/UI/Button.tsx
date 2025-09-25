import styled from "styled-components";
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    loading?: boolean;
}

const StyledButton = styled(MuiButton)`
    text-transform: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

export const Button = ({
    loading,
    children,
    disabled,
    ...props 
}: ButtonProps) => {
    return (
        <StyledButton
            {...props}
            disabled={loading || disabled}
        >
            {loading ? 'Loading...' : children}
        </StyledButton>
    );
}
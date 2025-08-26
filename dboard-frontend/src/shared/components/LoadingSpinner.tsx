import { Spin } from "antd";
import styled from "styled-components";


const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
`;

interface LoadingSpinnerProps {
    size?: 'small' | 'default' | 'large';
}

export const LoadingSpinner = ({ size = 'default' }: LoadingSpinnerProps) => {
    return (
        <SpinnerContainer>
            <Spin size={size} />
        </SpinnerContainer>
    );
}


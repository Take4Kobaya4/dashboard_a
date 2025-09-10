import { Spin, type SpinProps } from "antd";
import styled from "styled-components";

interface LoadingSpinnerProps extends SpinProps {
    fullScreen?: boolean;
}

const FullScreenWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
`;

const CenterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
`;

export const LoadingSpinner = ({ fullScreen = false, ...props }: LoadingSpinnerProps) => {
    const spinner = <Spin size="large" {...props} />;

    if(fullScreen) {
        return <FullScreenWrapper>{spinner}</FullScreenWrapper>;
    }

    return <CenterWrapper>{spinner}</CenterWrapper>;
};

import { Modal, type ModalProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmDialogProps extends Omit<ModalProps, 'onOk'> {
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
}

export const ConfirmDialog = ({ 
    onConfirm, 
    onCancel, 
    loading,
    children,
    title = '確認', 
    ...props }: ConfirmDialogProps) => {
    
    return (
        <Modal
            title={
                <span>
                    <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
                    {title}
                </span>
            }
            onOk={onConfirm}
            onCancel={onCancel}
            okText="OK"
            cancelText="いいえ"
            okType="danger"
            confirmLoading={loading}
            {...props}
        >
            {children}
        </Modal>
    );
}

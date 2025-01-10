import { FC } from 'react';
import { Modal } from 'antd';

interface ITemplateModel {
    isModelOpen: boolean,
    handleOk(): void
    handleCancel(): void
    children?: any
}


const TemplateModal: FC<ITemplateModel> = ({ isModelOpen, handleOk, handleCancel, children }) => {
    return (
        <>
            <Modal open={isModelOpen} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default TemplateModal;
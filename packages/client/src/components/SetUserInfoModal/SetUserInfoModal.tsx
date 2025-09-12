import React from "react";
import { Alert, Button, Form, Input, Modal } from "antd";
import type { UserInfoType } from "../../store/useUserStore";

export type SetUserInfoModalType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: UserInfoType) => void; // 新增
};

const SetUserInfoModal: React.FC<SetUserInfoModalType> = (props) => {
  const { isModalOpen, setIsModalOpen, onSubmit } = props;
  const [form] = Form.useForm<UserInfoType>();

  const handleOk = async () => {
    try {
      // 校验整个表单
      const values = await form.validateFields();
      onSubmit?.(values);
    } catch (errorInfo) {
      console.log("校验失败:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="修改用户信息"
      closable={true}
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnHidden={true}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button type="primary" key="submit" onClick={handleOk}>
          确认
        </Button>,
      ]}
    >
      <Alert style={{ marginBottom: 20 }} message="用户名是的你的唯一认证标记" type="warning" showIcon closable />
      <Form<UserInfoType> name="setUserInfoForm" preserve={false} form={form} autoComplete="off">
        <Form.Item label="用户名" name="name" rules={[{ required: true, message: "请输入用户名!" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetUserInfoModal;

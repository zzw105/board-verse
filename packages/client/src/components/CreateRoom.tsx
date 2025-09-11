import React from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';

export type CreateRoomType = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onSubmit?: (values: FieldType) => void; // 新增
}

export type FieldType = {
  username: string;
  roomID: string;
  numPlayers: string;
};

const CreateRoom: React.FC<CreateRoomType> = (props) => {
  const { isModalOpen, setIsModalOpen, onSubmit } = props;
  const [form] = Form.useForm();

  const handleOk = async () => {
    // setIsModalOpen(false);
    try {
      // 校验整个表单
      const values = await form.validateFields();
      console.log('校验通过，表单值:', values);
      onSubmit?.(values)
    } catch (errorInfo) {
      console.log('校验失败:', errorInfo);
    }
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
  };





  return (

    <Modal
      title="创建/加入 房间"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      footer={[
        <Button onClick={handleCancel}>
          取消
        </Button>,
        <Button onClick={handleOk}>
          确认
        </Button>,

      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ username: '', roomID: '', numPlayers: '1' }}
        form={form}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="房间号"
          name="roomID"
          rules={[{ required: true, message: '请输入房间号!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="房间人数"
          name="numPlayers"
          rules={[{ required: true, message: '请输入房间人数!' }]}
        >
          <Radio.Group >
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
            <Radio.Button value="4">4</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoom;
import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useBoardgameStore } from "../../store/useBoardgameStore";

export type CreateRoomModalType = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onSubmit?: (values: FieldType) => void; // 新增
};

export type FieldType = {
  roomName: string;
  gameType: string;
  numPlayers: number;
};

const CreateRoomModal: React.FC<CreateRoomModalType> = (props) => {
  const { isModalOpen, setIsModalOpen, onSubmit } = props;
  const [form] = Form.useForm();
  const { setGameList, gameList } = useBoardgameStore();
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

  useEffect(() => {
    setGameList();
  }, [setGameList]);

  return (
    <Modal
      title="创建/加入 房间"
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
      <Form<FieldType>
        name="createRoomForm"
        preserve={false}
        initialValues={{ numPlayers: 1, roomName: "房间" }}
        form={form}
        autoComplete="off"
      >
        <Form.Item label="游戏类型" name="gameType" rules={[{ required: true, message: "请选择游戏类型!" }]}>
          <Select placeholder="请选择游戏类型" options={gameList} />
        </Form.Item>

        <Form.Item label="房间名称" name="roomName" rules={[{ required: true, message: "请输入房间名称!" }]}>
          <Input placeholder="请输入房间名称" />
        </Form.Item>

        <Form.Item label="房间人数" name="numPlayers" rules={[{ required: true, message: "请输入房间人数!" }]}>
          <Radio.Group>
            <Radio.Button value={1}>1</Radio.Button>
            <Radio.Button value={2}>2</Radio.Button>
            <Radio.Button value={3}>3</Radio.Button>
            <Radio.Button value={4}>4</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoomModal;

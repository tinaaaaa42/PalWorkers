import React, { useState } from 'react';
import { Table, Button, Input, Avatar, Tag, Form, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Teams = [
  {
    id: 1,
    name: 'team1',
    participant: [
      { id: 1, username: 'user1', avatar: null },
      { id: 2, username: 'user2', avatar: null },
      { id: 3, username: 'user3', avatar: null },
    ],
    leader: [{ id: 4, username: 'user4', avatar: null }],
  },
  {
    id: 2,
    name: 'team2',
    participant: [
      { id: 1, username: 'user1', avatar: null },
      { id: 2, username: 'user2', avatar: null },
    ],
    leader: [
      { id: 3, username: 'user3', avatar: null },
      { id: 4, username: 'user4', avatar: null },
    ],
  },
];

const currentUser = { id: 1, username: 'user1' };

const TeamTable = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const expandedRowRender = (team) => {
    const participantColumns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar) => (
          <Avatar icon={!avatar && <UserOutlined />} src={avatar} />
        ),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => (
          <>
            {text}
            {record.id === currentUser.id && (
              <Tag color="blue" style={{ marginLeft: 10 }}>
                Current User
              </Tag>
            )}
          </>
        ),
      },
    ];

    const leaderColumns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar) => (
          <Avatar icon={!avatar && <UserOutlined />} src={avatar} />
        ),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => (
          <>
            {text}
            {record.id === currentUser.id && (
              <Tag color="blue" style={{ marginLeft: 10 }}>
                Current User
              </Tag>
            )}
          </>
        ),
      },
    ];

    return (
      <>
        <p>
          <strong>Participants:</strong>
        </p>
        <Table
          columns={participantColumns}
          dataSource={team.participant}
          pagination={false}
          rowKey="id"
        />
        <p>
          <strong>Leaders:</strong>
        </p>
        <Table
          columns={leaderColumns}
          dataSource={team.leader}
          pagination={false}
          rowKey="id"
        />
      </>
    );
  };

  const columns = [
    { title: 'Team Name', dataIndex: 'name', key: 'name' },
  ];

  const handleCreateTeam = () => {
    form
      .validateFields()
      .then((values) => {
        // 模拟发送请求到后台创建团队
        console.log('Creating team with name:', values.teamName);
        // 模拟后台返回邀请码
        const newInvitationCode = 'ABC123';
        setInvitationCode(newInvitationCode);
        message.success(`Team created! Invitation code: ${newInvitationCode}`);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleAddTeam = () => {
    addForm
      .validateFields()
      .then((values) => {
        // 模拟发送请求到后台加入团队
        console.log('Adding team with code:', values.invitationCode);
        message.success(`Joined team with invitation code: ${values.invitationCode}`);
        setIsAddModalVisible(false);
        addForm.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCreateTeamComplete = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
    setInvitationCode('');
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
        Create Team
      </Button>
      <Button type="default" onClick={() => setIsAddModalVisible(true)} style={{ marginLeft: 10 }}>
        Add Team
      </Button>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={Teams}
        rowKey="id"
      />
      <Modal
        title="Create Team"
        visible={isCreateModalVisible}
        onCancel={handleCreateTeamComplete}
        footer={null} // 移除默认的 footer，替换为自定义的 footer
      >
        <Form form={form} layout="vertical" name="create_team_form">
          <Form.Item
            name="teamName"
            label="Team Name"
            rules={[{ required: true, message: 'Please input the team name!' }]}
          >
            <Input placeholder="Enter team name" />
          </Form.Item>
        </Form>
        {invitationCode && (
          <p style={{ marginTop: 20 }}>
            <strong>Invitation Code:</strong> {invitationCode}
          </p>
        )}
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handleCreateTeam} style={{ marginRight: 8 }}>
            OK
          </Button>
          <Button onClick={handleCreateTeamComplete}>
            Complete
          </Button>
        </div>
      </Modal>
      <Modal
        title="Add Team"
        visible={isAddModalVisible}
        onOk={handleAddTeam}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form form={addForm} layout="vertical" name="add_team_form">
          <Form.Item
            name="invitationCode"
            label="Invitation Code"
            rules={[{ required: true, message: 'Please input the invitation code!' }]}
          >
            <Input placeholder="Enter invitation code" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TeamTable;

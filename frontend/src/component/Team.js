import React, { useState } from 'react';
import { Table, Button, Input, Avatar, Tag, Form, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { create_team, join_team } from '../service/team';

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

const TeamTable = ({team}) => {
  console.log(team)
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const transformData = (rawData) => {
    const teams = rawData.reduce((acc, team) => {
      const transformedTeam = {
        id: team.team.id,
        name: team.team.name,
        participant: [],
        leader: [],
      };

      console.log(transformedTeam)
  
      // Add participants
      team.team.teamMembers.forEach((member) => {
        if (!member.leader) {
          transformedTeam.participant.push({
            id: member.user.id,
            username: member.user.username,
            avatar: null, // Assuming avatar is not provided in the raw data
          });
        }
      });
  
      team.team.teamMembers.forEach((member) => {
        if (member.leader) {
          transformedTeam.leader.push({
            id: member.user.id,
            username: member.user.username,
            avatar: null, // Assuming avatar is not provided in the raw data
          });
        }
      });
  
      acc.push(transformedTeam);
      return acc;
    }, []);

    // Add current user information if provided
    // const currentUser = team.team.teamMembers.find((member) => member.user.username === team.user.username);
    const currentUser = team[0].user;
    console.log(currentUser)
    // if (currentUser) {
    //   teams[0].participant.push({
    //     id: currentUser.id,
    //     username: currentUser.username,
    //     avatar: null, 
    //   });
    // }
  
    return teams;
  };
  
  const Teams = transformData(team);
  console.log(Teams);
  
  const expandedRowRender = (team) => {
    //console.log(curUser);
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

  const handleCreateTeam = async(teamName) => {
    try {
      const newInvitationCode = await create_team(teamName);
      // 设置邀请码
      // const newInvitationCode = "123456";
      console.log(newInvitationCode);
      setInvitationCode(newInvitationCode);
      // 显示成功消息
      message.success(`Team created! Invitation code: ${newInvitationCode}`);
    } catch (error) {
      // 打印验证失败的信息
      console.log('Validate Failed:', error);
      // 可能还需要处理错误情况，比如显示错误消息
      message.error('Failed to create team. Please try again.');
    }
  };

  const handleAddTeam = async(invitationCode) => {
    try{
        const team=await join_team(invitationCode);  
        console.log('Adding team with code:', invitationCode);
        message.success(`Joined team with invitation code: ${invitationCode}`);
        setIsAddModalVisible(false);
        addForm.resetFields();
    }catch (error){
      message.error('Failed to add team. Please try again.');
    }
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
          <Button type="primary" onClick={() => handleCreateTeam(form.getFieldValue('teamName'))} style={{ marginRight: 8 }}>
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
        onOk={() => handleAddTeam(addForm.getFieldValue('invitationCode'))}
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

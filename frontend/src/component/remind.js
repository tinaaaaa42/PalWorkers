import React, { useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';

const Remind = () => {
  const [expiredTasks, setExpiredTasks] = useState([
    { key: '1', name: 'Expired Task 1', ddl: '2024-05-01' },
    { key: '2', name: 'Expired Task 2', ddl: '2024-05-02' },
  ]);

  const [urgentTasks, setUrgentTasks] = useState([
    { key: '1', name: 'Urgent Task 1', ddl: '2024-06-01' },
    { key: '2', name: 'Urgent Task 2', ddl: '2024-06-02' },
  ]);

  const handleComplete = (key, type) => {
    if (type === 'expired') {
      setExpiredTasks(expiredTasks.filter(task => task.key !== key));
      message.success('任务已完成');
    } else if (type === 'urgent') {
      setUrgentTasks(urgentTasks.filter(task => task.key !== key));
      message.success('任务已完成');
    }
  };

  const handleDelete = (key, type) => {
    if (type === 'expired') {
      setExpiredTasks(expiredTasks.filter(task => task.key !== key));
      message.success('任务已删除');
    } else if (type === 'urgent') {
      setUrgentTasks(urgentTasks.filter(task => task.key !== key));
      message.success('任务已删除');
    }
  };

  const getColumns = (type) => [
    {
      title: '任务名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DDL',
      dataIndex: 'ddl',
      key: 'ddl',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="square"
            icon={<CheckSquareOutlined style={{fontSize:'24px'}}/>}
            onClick={() => handleComplete(record.key, type)}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined style={{color:'red',fontSize:'24px'}}/>}
            onClick={() => handleDelete(record.key, type)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>过期任务</h2>
      <Table
        columns={getColumns('expired')}
        dataSource={expiredTasks}
        pagination={false}
        rowKey="key"
        style={{width:'750px'}}
      />
      <h2 style={{ marginTop: '20px' }}>紧急任务</h2>
      <Table
        columns={getColumns('urgent')}
        dataSource={urgentTasks}
        pagination={false}
        style={{width:'750px'}}
        rowKey="key"
      />
    </div>
  );
};

export default Remind;

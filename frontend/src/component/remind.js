import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { completeTask } from '../service/advance';

const Remind = (remindtask) => {
  const [expiredTasks, setExpiredTasks] = useState([
    // { id: '1', name: 'Expired Task 1', ddl: '2024-05-01' },
    // { id: '2', name: 'Expired Task 2', ddl: '2024-05-02' },
  ]);

  const [urgentTasks, setUrgentTasks] = useState([
    // { id: '1', name: 'Urgent Task 1', ddl: '2024-06-01' },
    // { id: '2', name: 'Urgent Task 2', ddl: '2024-06-02' },
  ]);
  useEffect( () => {
    setExpiredTasks(remindtask.remindtask.expired);
    setUrgentTasks(remindtask.remindtask.urgent);
    }, []);
  const handleComplete = async(id, type) => {
    try{
      if (type === 'expired') {
        // setExpiredTasks(expiredTasks.filter(task => task.id !== id));
        const response=await completeTask(id);
        message.success('任务已完成');
      } else if (type === 'urgent') {
        const response=await completeTask(id);
        message.success('任务已完成');
      }
    }catch{

    }
    
  };

  const handleDelete = (id, type) => {
    if (type === 'expired') {
      setExpiredTasks(expiredTasks.filter(task => task.id !== id));
      message.success('任务已删除');
    } else if (type === 'urgent') {
      setUrgentTasks(urgentTasks.filter(task => task.id !== id));
      message.success('任务已删除');
    }
  };

  console.log(urgentTasks)

  const getColumns = (type) => [
    {
      title: '任务名',
      dataIndex: 'name',
      id: 'name',
    },
    {
      title: 'DDL',
      dataIndex: 'dueDate',
      id: 'dueDate',
    },
    {
      title: '操作',
      id: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="square"
            icon={<CheckSquareOutlined style={{fontSize:'24px'}}/>}
            onClick={() => handleComplete(record.id, type)}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined style={{color:'red',fontSize:'24px'}}/>}
            onClick={() => handleDelete(record.id, type)}
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
        rowid="id"
        style={{width:'750px'}}
      />
      <h2 style={{ marginTop: '20px' }}>紧急任务</h2>
      <Table
        columns={getColumns('urgent')}
        dataSource={urgentTasks}
        pagination={false}
        style={{width:'750px'}}
        rowid="id"
      />
    </div>
  );
};

export default Remind;

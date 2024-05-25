import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, TagsOutlined, ContainerOutlined, ProjectOutlined } from '@ant-design/icons';
import { Menu, Typography } from 'antd';

const { Title } = Typography;

const Navbar = () => {
  const teams = ['Team1', 'Team2', 'Team3'];
  const tags = ['Tag1', 'Tag2', 'Tag3'];
  const tasks = ['Task1', 'Task2', 'Task3'];
  const projects = ['Project1111', 'Project2', 'Project3'];
  const renderItems = (icon, label, children) => ({
    key: label.toLowerCase(),
    icon: icon,
    label,
    children: children ? children.map((child, index) => ({
      key: `${label.toLowerCase()}-${index}`,
      label: child,
    })) : [],
    visible: children && children.length > 0,
  });

  const teamsItem = renderItems(<MailOutlined />, 'Teams', teams);
  const tagsItem = renderItems(<TagsOutlined />, 'Tags', tags);
  const tasksItem = renderItems(<ContainerOutlined />, 'Tasks', tasks);
  const projectsItem = renderItems(<ProjectOutlined />, 'Projects', projects);

  const items = [
    teamsItem.visible && teamsItem,
    tagsItem.visible && tagsItem,
    tasksItem.visible && tasksItem,
    projectsItem.visible && projectsItem,
  ].filter(item => item); // 过滤掉不可见的项

  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <div>
      <Title level={3} style={{ padding: '16px 24px' }}>Navigation Menu</Title>
      <Menu
        onClick={onClick}
        style={{
          width: '220px',
        }}
        mode="inline"
        items={items}
      />
    </div>
  );
};

// 示例数据


export default Navbar;

// 在使用该组件时，可以传入实际的 teams、tags、tasks 和 projects 数据
// <Navbar teams={teams} tags={tags} tasks={tasks} projects={projects} />

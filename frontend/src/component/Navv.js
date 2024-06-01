import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, TagsOutlined, ContainerOutlined, ProjectOutlined } from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Navbar = ({tasks,title,allteam,teamss}) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const teams = ['Team1', 'Team2', 'Team3'];
  const tags = ['Tag1', 'Tag2', 'Tag3'];
  const tasksName = tasks.map(task => task.title);
  const taskTagsSet = new Set();
  const teamSet = new Set();
  tasks.forEach(task => {
    task.taskTags.forEach(tag => {
      taskTagsSet.add(tag.tag.name);
    });
  });
  tasks.forEach(task => {
    if(task.team)
    teamSet.add(task.team.name);
  });
  const uniqueTags = Array.from(taskTagsSet);
  const uniqueTeams= Array.from(teamSet);
  const projects = ['Project', 'Project2', 'Project3'];
  const teamsname=isProfilePage?teamss:uniqueTeams;
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

  const teamsItem = renderItems(<MailOutlined style={{fontSize:'20px'}}/>, 'Teams', teamsname);
  const tagsItem = renderItems(<TagsOutlined style={{fontSize:'20px'}}/>, 'Tags', uniqueTags);
  const tasksItem = renderItems(<ContainerOutlined style={{fontSize:'20px'}}/>, 'Tasks', tasksName);
  const projectsItem = renderItems(<ProjectOutlined style={{fontSize:'20px'}}/>, 'Projects', projects);

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
      <Title level={3} style={{ padding: '16px 24px' ,fontSize:'35px'}}>{title}</Title>
      <Menu
        onClick={onClick}
        style={{
          width: '220px',
          fontSize:'20px'
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

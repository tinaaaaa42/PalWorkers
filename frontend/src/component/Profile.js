import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Row, Col, Card } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, SettingOutlined, LogoutOutlined, NotificationOutlined, IdcardOutlined, BarChartOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { CurUser } from '../Data/data';
import TeamTable from './Team';  // 请确保导入了 TeamTable 组件
import ProfileInfo from './Profileinfo';
import Remind from './remind';

const { Header, Content } = Layout;
const { Title } = Typography;

function UserProfile({team,week_data,kanban_data,remindtask,handleUpdate}) {
  const [selectedMenu, setSelectedMenu] = useState('activity');

  // const data = [
  //   { date: '2024-05-10', type: 'Added', value: 5 },
  //   { date: '2024-05-11', type: 'Added', value: 20 },
  //   { date: '2024-05-12', type: 'Added', value: 10 },
  //   { date: '2024-05-13', type: 'Added', value: 15 },
  //   { date: '2024-05-14', type: 'Added', value: 9 },
  //   { date: '2024-05-10', type: 'Completed', value: 3 },
  //   { date: '2024-05-11', type: 'Completed', value: 15 },
  //   { date: '2024-05-12', type: 'Completed', value: 8 },
  //   { date: '2024-05-13', type: 'Completed', value: 10 },
  //   { date: '2024-05-14', type: 'Completed', value: 5 },
  // ];
  const data = week_data;

  const taskData = kanban_data;

  const lineConfig = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    xAxis: { type: 'time' },
    yAxis: {},
    smooth: true,
    color: ['#1979C9', '#D62A0D'],
    legend: { position: 'top-right' },
    autoFit: true,
    height: 300,
  };

  const pieConfig = {
    appendPadding: 10,
    data: taskData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    autoFit: true,
    height: 300,
    label: {
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const renderContent = () => {
    if (selectedMenu === 'team') {
      return <TeamTable team={team} handleUpdate={handleUpdate}/ >;
    } else if (selectedMenu === 'activity') {
      return (
        <>
          <Card title="本周活动" style={{ marginBottom: '20px' ,height:'430px'}}>
            <Line {...lineConfig} />
          </Card>
          <Card title="The Month Tasks" style={{ height: '300px' }}>
            <Pie {...pieConfig} />
          </Card>
        </>
      );
    }else if(selectedMenu=='intro'){
      return <ProfileInfo></ProfileInfo>
    }else if(selectedMenu=='remind'){
      return <Remind remindtask={remindtask} handleUpdate={handleUpdate}></Remind>
    }
    return null;
  };

  console.log(remindtask)

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'white', padding: 0 }}>
        <Title level={2} style={{ margin: '16px' }}>个人主页</Title>
      </Header>
      <Content style={{ padding: '0 60px', borderRadius: '20px', backgroundColor: 'white' }}>
        <Row gutter={12}>
          <Col span={8} >
            <Card style={{height:'750px'}}>
              <Avatar size={80} src={process.env.PUBLIC_URL + '/' + CurUser.profilelogo} />
              <Title level={4} style={{ marginTop: '20px' }}>{CurUser.username}</Title>
              <Menu
                defaultSelectedKeys={['activity']}
                mode="inline"
                style={{ width: '100%' }}
                onClick={({ key }) => setSelectedMenu(key)}
              >
                <Menu.Item key="activity" icon={<BarChartOutlined />} style={{ height: '60px', lineHeight: '60px' }}>活动</Menu.Item>
                <Menu.Item key="intro" icon={<MailOutlined />} style={{ height: '60px', lineHeight: '60px' }}>个人资料</Menu.Item>
                <Menu.Item key="team" icon={<TeamOutlined />} style={{ height: '60px', lineHeight: '60px' }}>我的团队</Menu.Item>
                {/* <Menu.Item key="3" icon={<SettingOutlined />} style={{ height: '60px', lineHeight: '60px' }}>设置</Menu.Item> */}
                <Menu.Item key="remind" icon={<NotificationOutlined />} style={{ height: '60px', lineHeight: '60px' }}>提醒</Menu.Item>
                {/* <Menu.Item key="4" icon={<LogoutOutlined />} style={{ height: '60px', lineHeight: '60px' }}>退出登录</Menu.Item> */}
              </Menu>
            </Card>
          </Col>
          <Col span={16}>
            {renderContent()}
          </Col>
        </Row>
      </Content>
      
    </Layout>
  );
}

export default UserProfile;

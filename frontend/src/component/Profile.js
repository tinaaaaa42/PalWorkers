import React from 'react';
import { Layout, Menu, Avatar, Typography, Row, Col, Card } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, SettingOutlined, LogoutOutlined, NotificationOutlined, IdcardOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { CurUser } from '../Data/data';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function UserProfile() {
    const data = [
        { date: '2024-05-10', type: 'Added', value: 5 },
        { date: '2024-05-11', type: 'Added', value: 20 },
        { date: '2024-05-12', type: 'Added', value: 10 },
        { date: '2024-05-13', type: 'Added', value: 15 },
        { date: '2024-05-14', type: 'Added', value: 9 },
        { date: '2024-05-10', type: 'Completed', value: 3 },
        { date: '2024-05-11', type: 'Completed', value: 15 },
        { date: '2024-05-12', type: 'Completed', value: 8 },
        { date: '2024-05-13', type: 'Completed', value: 10 },
        { date: '2024-05-14', type: 'Completed', value: 5 },
    ];

    const taskData = [
        { type: 'Todo', value: 30 },
        { type: 'In Progress', value: 40 },
        { type: 'Review', value: 15 },
        { type: 'Completed', value: 15 },
    ];

    const lineConfig = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        xAxis: { type: 'time' },
        yAxis: {},
        smooth: true,
        color: ['#1979C9', '#D62A0D'], // 蓝色和红色区分两种状态
        legend: { position: 'top-right' },
        autoFit: true,
        height: 300,  // 指定图表高度
    };
    
    const pieConfig = {
        appendPadding: 10,
        data: taskData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.6,
        autoFit: true,
        height: 300,  // 保持与折线图相同的高度
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
    

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: 'white', padding: 0 }}>
                <Title level={2} style={{ margin: '16px' }}>个人主页</Title>
            </Header>
            <Content style={{ padding: '0 60px', borderRadius: '20px', backgroundColor: 'white' }}>
                <Row gutter={12}>
                    <Col span={8}>
                        <Card>
                            <Avatar size={80} src={process.env.PUBLIC_URL + '/' + CurUser.profilelogo }/>
                            <Title level={4} style={{ marginTop: '20px' }}>{CurUser.username}</Title>
                            <Menu defaultSelectedKeys={['1']} mode="inline" style={{ width: '100%' }}>
                                <Menu.Item key="1" icon={<MailOutlined />} style={{ height: '60px', lineHeight: '60px' }}>邮箱</Menu.Item>
                                <Menu.Item key="2" icon={<TeamOutlined />} style={{ height: '60px', lineHeight: '60px' }}>我的团队</Menu.Item>
                                <Menu.Item key="3" icon={<SettingOutlined />} style={{ height: '60px', lineHeight: '60px' }}>设置</Menu.Item>
                                <Menu.Item key="5" icon={<IdcardOutlined />} style={{ height: '60px', lineHeight: '60px' }}>账号</Menu.Item>
                                <Menu.Item key="6" icon={<NotificationOutlined />} style={{ height: '60px', lineHeight: '60px' }}>提醒</Menu.Item>
                                <Menu.Item key="4" icon={<LogoutOutlined />} style={{ height: '60px', lineHeight: '60px' }}>退出登录</Menu.Item>
                            </Menu>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="本周活动" style={{ marginBottom: '20px' }}>
                            <Line {...lineConfig} />
                        </Card>
                        <Card title="The Month Tasks" style={{ height: '300px' }}>
                            <Pie {...pieConfig} />
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>todo design</Footer>
        </Layout>
    );
}

export default UserProfile;

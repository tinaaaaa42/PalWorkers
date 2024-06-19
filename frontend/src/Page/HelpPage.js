import React from 'react';
import { Layout, Menu, Carousel } from 'antd';
import Navleft from '../component/navleft';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;

const HelpPage = () => {
    const [selectedKey, setSelectedKey] = useState('1');  // 默认选中第一个菜单项

    const items1 = [
        { key: '1', src: '/kanbancreate.png', title: <h3>创建任务</h3> },
        { key: '4', src: '/kanbancreate2.png', title: <h3>创建任务1</h3> },
    ];
    const items2 = [
        { key: '2', src: '/kanban.png', title: <h3>每月页面</h3> },
        { key: '5', src: '/week.png', title: <h3>每周页面</h3> },
        { key: '2', src: '/day.png', title: <h3>每日页面</h3> },
    ];
    const items3 = [
        { key: '3', src: '/ctrla.png', title: <h3>Ctrl+A</h3> },
        { key: '3', src: '/ctrlc.png', title: <h3>Ctrl+C</h3> },
    ];
    const items4 = [
        { key: '3', src: '/ctrla.png', title: <h3>Ctrl+A</h3> },
        { key: '3', src: '/ctrlc.png', title: <h3>Ctrl+C</h3> },
    ];
    const renderCarousel = () => {
        switch (selectedKey) {
            case '1':
                return <Carousel effect="fade" dots dotPosition='bottom' >{renderCarouselItems(items1)}</Carousel>;
            case '2':
                return <Carousel effect="fade" dots dotPosition='bottom'>{renderCarouselItems(items2)}</Carousel>;
            case '3':
                return <Carousel effect="fade" dots dotPosition='bottom'>{renderCarouselItems(items3)}</Carousel>;
            case '4':
                return <Carousel effect="fade" dots dotPosition='bottom'>{renderCarouselItems(items4)}</Carousel>;
            default:
                return null;
        }
    };
    const renderCarouselItems = (items) => {
        return items.map((item) => (
            <div key={item.key}style={{height:'650px',width:'1000px'}}>
                <div className="carousel-caption" style={{fontSize:'30px',paddingLeft:'20px',marginTop:'5px',marginBottom:'15px'}}>{item.title}</div>
                <img src={process.env.PUBLIC_URL + item.src} alt={item.title.toString()} style={{height:'600px',width:'1000px',borderRadius:'5px',marginLeft:'50px'}}/>
                <div style={{height:'30px',background:'gray',width:'1000px',marginLeft:'50px'}}></div>
            </div>
        ));
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={79}>
                <Navleft />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#fff', paddingLeft:'20px' ,marginTop:'10px'}}>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} onSelect={({ key }) => setSelectedKey(key)} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">创建任务</Menu.Item>
                        <Menu.Item key="2">界面描述</Menu.Item>
                        <Menu.Item key="3">快捷键</Menu.Item>
                        <Menu.Item key="4">创建团队</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '24px 40px' }}>
                {renderCarousel()}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default HelpPage;

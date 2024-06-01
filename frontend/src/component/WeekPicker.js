import React from 'react'
import { useState } from 'react';
import { Row, Col, Button, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const WeekPicker = ({handleWeekSearch}) => {
    // 周选择器的值
    const [weekDate, setWeekDate] = React.useState(null);
    const [dates, setDates] = useState(null);
    // 选择周日期的事件处理
    const handleChange = (dates) => {
      if (dates && dates.length === 2) {
        setDates(dates);
      }
    };
    const HandleSearch=(dates)=>{
      if (dates && dates.length === 2) {
        handleWeekSearch(dates[0],dates[1]);
      }
    }
    return (
      <Row gutter={16} justify="center" align="middle">
        <Col span={12}>
          <Space direction="horizontal" size={12} style={{ marginBottom: '15px' }}>
            <RangePicker onChange={handleChange} value={dates} style={{height:'45px',width:'450px'}}/>
            <Button type="primary" size="large" onClick={()=>HandleSearch(dates)}>
              确定
            </Button>
            <Button type="primary" size="large" onClick={() => console.log('选中的周日期:', weekDate)}>
              取消
            </Button>
          </Space>
        </Col>
      </Row>
    );
};
export default WeekPicker;
import React from 'react'
import { useState } from 'react';
import { Row, Col, Button, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const MonthPicker = () => {
    // 周选择器的值
    const [monthDate, setMonthDate] = React.useState(null);
    const [dates, setDates] = useState(null);
    // 选择周日期的事件处理
    const onMonthDateChange = (range, dateString) => {
      setMonthDate(range);
    };
    return (
      <Row gutter={16} justify="center" align="middle">
        <Col span={12}>
          <Space direction="horizontal" size={12} style={{ marginBottom: '15px' }}>
            <RangePicker onChange={onMonthDateChange} value={dates} style={{height:'45px',width:'450px'}}/>
            <Button type="primary" size="large" onClick={() => console.log('选中的月日期:', monthDate)}>
              确定
            </Button>
            <Button type="primary" size="large" onClick={() => console.log('选中的月日期:', monthDate)}>
              取消
            </Button>
          </Space>
        </Col>
      </Row>
    );
};
export default MonthPicker;
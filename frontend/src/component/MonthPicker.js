import React from 'react'
import { useState } from 'react';
import { Row, Col, Button, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const MonthPicker = ({handleKanbanSearch,handleReset}) => {
    // 周选择器的值
    const [monthDate, setMonthDate] = React.useState(null);
    const [dates, setDates] = useState(null);
    // 选择周日期的事件处理
    const handleChange = (dates) => {
      if (dates && dates.length === 2) {
        setDates(dates);
      }
    };
    const HandleSearch=(dates)=>{
      if (dates && dates.length === 2) {
        handleKanbanSearch(dates[0],dates[1]);
      }
    }
    const HandleReset=()=>{
      setDates(null)
      handleReset();
    }
    return (
      <Row gutter={16} justify="center" align="middle">
        <Col span={12}>
          <Space direction="horizontal" size={12} style={{ marginBottom: '15px' }}>
            <RangePicker onChange={handleChange} value={dates} style={{height:'45px',width:'450px'}}/>
            <Button type="primary" size="large" onClick={()=>HandleSearch(dates)}>
              确定
            </Button>
            <Button type="primary" size="large" onClick={HandleReset}>
              取消
            </Button>
          </Space>
        </Col>
      </Row>
    );
};
export default MonthPicker;
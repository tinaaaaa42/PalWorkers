import React from 'react';
import { Row, Col, Button, DatePicker, Space } from 'antd';

const DayPicker = ({handleDaySearch,handleReset}) => {
  const [singleDate, setSingleDate] = React.useState(null);

  // 选择单个日期的事件处理
  const onSingleDateChange = (date, dateString) => {
    setSingleDate(date);
  };
  const handleSearch = (date) => {
    handleDaySearch(date);
  };
  const HandleReset=()=>{
    setSingleDate(null);
    handleReset();
  }
  return (
    <Row gutter={16} justify="center" align="middle">
      <Col span={12}>
        <Space direction="horizontal" size={12} style={{ marginBottom: '15px' }}>
          <DatePicker
            mode="date"
            allowClear
            onChange={onSingleDateChange}
            placeholder="选择日期"style={{height:'45px',width:'300px'}}
            size="large" 
          />
          <Button type="primary" size="large" onClick={() => handleSearch(singleDate)}>
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


export default DayPicker;

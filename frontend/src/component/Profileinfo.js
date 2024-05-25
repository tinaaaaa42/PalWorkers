import React, { useState } from 'react';
import { Form, Input, Card, Typography, Button, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfileInfo = () => {
  const [signature, setSignature] = useState('Keep pushing forward!');
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      // 假设服务器返回的URL
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
    }
  };

  const handleSave = () => {
    // 在这里处理保存逻辑
    console.log('Saved signature:', signature);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <Card style={{ width: 400,height:'750px', margin: '0 auto', padding: 20 }}>
      <Title level={3} style={{ textAlign: 'center' }}>个人资料</Title>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Upload
          name="avatar"
          showUploadList={false}
          customRequest={handleUpload}
        >
          {avatarUrl ? (
            <Avatar src={avatarUrl} size={64} />
          ) : (
            <Button icon={<UploadOutlined />} shape="circle" />
          )}
        </Upload>
      </div>
      <Form layout="vertical">
        <Form.Item label="用户名">
          <Input value="John Doe" readOnly />
        </Form.Item>
        <Form.Item label="邮箱">
          <Input value="john.doe@example.com" readOnly />
        </Form.Item>
        <Form.Item label="个性签名">
          <Input.TextArea value={signature} onChange={handleSignatureChange} rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave}>保存</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileInfo;

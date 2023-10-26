import Style from '../../assets/css/ApplyFor.module.css'
import {
  Button,
  Card,
  Form,
  Input,
  Select,
} from 'antd';
const { Option } = Select;
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function ApplyFor() {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={Style.box}>
      <Card title="活动报名">
        <Form initialValues={{prefix: '86'}}>
          <Form.Item
            label="姓名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="userage"
            rules={[
              {
                required: true,
                message: '请输入年龄!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              {
                required: true,
                message: '请输入联系电话!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="报名活动"
            rules={[
              {
                required: true,
                message: '请选择报名活动!',
              },
            ]}
          >
            <Select placeholder="下拉选择">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              确认报名
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

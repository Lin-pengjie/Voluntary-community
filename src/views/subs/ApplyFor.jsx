import Style from '@/assets/css/ApplyFor.module.css'
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  message,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {  useState } from 'react';
dayjs.locale('en');
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
  // const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setaddress] = useState()
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

  const { RangePicker } = DatePicker;

  const confirm = () => {
    // 获取用户当前位置
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        reverseGeocode(position.coords.latitude, position.coords.longitude)
        message.success('获取用户当前位置成功');
      },
      (error) => {
        console.log('获取用户当前位置失败', error);
        message.success('获取用户当前位置失败')
      }
    );
  };
  //逆地址解析
  const reverseGeocode = async (latitude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    if (response.ok) {
      setaddress(data.display_name)
    } else {
      console.log('逆地址解析失败');
    }
  };

  return (
    <div className={Style.box}>
      <Card title="活动申请" className={Style.Card}>
        <Form initialValues={{ prefix: '86' }}>
          <Form.Item
            label="活动名称"
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
            label="活动地点"
            name="locations"
            rules={[
              {
                required: true,
                message: '请输入年龄!',
              },
            ]}
          >
            <div>
              <Input disabled={true} value={address}/>
              <Popconfirm
                title="我们将获取您的位置?"
                onConfirm={confirm}
                onCancel={() => {message.error('Click on No');}}
                okText="同意"
                cancelText="取消"
              >
                <Button>获取位置</Button>
              </Popconfirm>
            </div>
          </Form.Item>

          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              {
                required: true,
                message: '请输入联系电话!',
              },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入有效的手机号码!',
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
            name="time"
            label="活动时间"
            rules={[
              {
                required: true,
                message: '请选择时间!',
              }
            ]}
          >
            <RangePicker />
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

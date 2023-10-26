import { Layout, Menu, Carousel, ConfigProvider, Space, Popover, QRCode } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Style from '../assets/css/home.module.css'
import img from "../assets/img/lb.jpg"
import { FileDoneOutlined, MessageOutlined, HomeOutlined, PartitionOutlined, WeiboCircleOutlined, WechatOutlined } from '@ant-design/icons';
import Notice from '../components/NoticeBoard/App'

const { Header, Footer } = Layout;
const src = 'https://github.com/Lin-pengjie';
const items = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: '活动报名',
    key: '/applyfor',
    icon: <FileDoneOutlined />
  },
  {
    label: '消息',
    key: '/message',
    icon: <MessageOutlined />,
  },
  {
    label: '进入后台',
    key: '/after',
    icon: <PartitionOutlined />
  }
]
//模拟时间和数据，到时发请求获取
const list = [
  {
    state: 0,
    date: 1000 * 60 * 60 * 24 * 2,
    district: "天津",
    title: 'xxx活动',
    text: '我们很高兴宣布，我们的志愿服务系统现在提供了一项全新的服务，将有助于老年人更轻松地享受生活。这项服务包括家居保洁、购物代办、社交陪伴等多项便利服务。欢迎了解更多信息并预约使用服务，让老年人的生活更加便捷。'
  },
  {
    state: 1,
    date: 1000 * 60 * 2,
    district: "天津",
    title: 'aaa活动',
    text: '我们很高兴宣布，我们的志愿服务系统现在提供了一项全新的服务，将有助于老年人更轻松地享受生活。这项服务包括家居保洁、购物代办、社交陪伴等多项便利服务。欢迎了解更多信息并预约使用服务，让老年人的生活更加便捷。'
  },
  {
    state: 3,
    date: 1000 * 60 * 60 * 24 * 2,
    district: "天津",
    title: 'bbb活动',
    text: '我们很高兴宣布，我们的志愿服务系统现在提供了一项全新的服务，将有助于老年人更轻松地享受生活。这项服务包括家居保洁、购物代办、社交陪伴等多项便利服务。欢迎了解更多信息并预约使用服务，让老年人的生活更加便捷。'
  },
]

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 设置导航栏主题   */}
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#fff1f0',
            borderRadius: 2,

            // 派生变量，影响范围小
            colorBgContainer: 'linear-gradient(to right, #da1f28, #ffa39e)',
          },
        }}
      >
        <Header className={Style.headerStyle}>
          <Menu
            onClick={(a) => {
              navigate(a.key)
            }}
            mode="horizontal"
            items={items}
            className={Style.menuStyle}
            selectedKeys={location.pathname}
          />
        </Header>
      </ConfigProvider>
      <Layout>
        <div style={{ background: "linear-gradient(to right, #ffa39e, #fff1f0)" }}>
          <Carousel autoplay>
            <div className={Style.carousel}>
              <img src={img} className={Style.carousel}></img>
            </div>
            <div className={Style.carousel}>
              <img src={img} className={Style.carousel}></img>
            </div>
          </Carousel>
        </div>
        <div style={{ display: "flex" }}>
          <div className={Style.side}>
            <Notice title="活动公告" list={list} />
          </div>
          <div className={Style.content}>
            <Outlet></Outlet>
          </div>
        </div>
      </Layout>
      <Footer className={Style.footerStyle}>
        <div>
          <Space size={40} style={{ borderBottom: "4px solid", padding: "10px 30px 25px" }}>
            <div>关于</div>
            <div>博客</div>
            <div>网站</div>
          </Space>
        </div>
        <div>
          <Space size={60} style={{ padding: "25px 30px 40px", fontSize: "35px" }}>
            <div>
              <Popover
                overlayInnerStyle={{
                  padding: 0,
                }}
                content={<QRCode value={src} bordered={false} />}
              >
                <WeiboCircleOutlined />
              </Popover>
            </div>
            <div>
              <Popover
                overlayInnerStyle={{
                  padding: 0,
                }}
                content={<QRCode value={src} bordered={false} />}
              >
                <WechatOutlined />
              </Popover>
            </div>
          </Space>
        </div>
      </Footer>
    </Layout>
  )
}
export default Home;
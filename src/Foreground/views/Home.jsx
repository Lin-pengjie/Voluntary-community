import { Layout, Menu, Carousel, ConfigProvider, Space, Popover, QRCode, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Style from '@f/assets/css/home.module.css'
import img from "@f/assets/img/lb.jpg"
import { FileDoneOutlined, MessageOutlined, HomeOutlined, PartitionOutlined, WeiboCircleOutlined, WechatOutlined } from '@ant-design/icons';
import Notice from '@f/components/NoticeBoard/App'
import { useEffect, useState } from 'react';
import { announcement } from '@f/apis/announcement'

const { Header, Footer } = Layout;
//页脚联系二维码
const src = 'https://github.com/Lin-pengjie';
//导航栏内容
const items = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: '活动申请',
    key: '/applyfor',
    icon: <FileDoneOutlined />
  },
  {
    label: '活动报名',
    key: '/signup',
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

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [list, setlist] = useState()

  useEffect(() => { fineAnnouncement() }, [])

  //调用api请求公告栏数据
  const fineAnnouncement = async () => {
    const res = await announcement()
    setlist(res.data)
  }

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
            {
              !list && <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            }
            {
              list && <Notice title="活动公告" list={list} />
            }
          </div>
          <div className={Style.content}>
            <Outlet></Outlet>
          </div>
        </div>
      </Layout>
      <Footer className={Style.footerStyle}>
        <div>
          <Space size={40} style={{ borderBottom: "4px solid", padding: "10px 30px 15px" }}>
            <div>关于</div>
            <div>博客</div>
            <div>网站</div>
          </Space>
        </div>
        <div>
          <Space size={60} style={{ padding: "15px", fontSize: "25px" }}>
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
        <div>&copy;&emsp;·&emsp;2023·幸福年华志愿行&emsp;·&emsp;Happy time volunteer line</div>
      </Footer>
    </Layout>
  )
}
export default Home;
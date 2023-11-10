import { Layout, Menu, Carousel, ConfigProvider, Space, Popover, QRCode, Spin, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Style from '@/assets/css/home.module.css'
import img from "@/assets/img/lb.jpg"
import { FileDoneOutlined, HomeOutlined, WeiboCircleOutlined, WechatOutlined, CommentOutlined } from '@ant-design/icons';
import Notice from '@/components/NoticeBoard/App'
import { useEffect, useState } from 'react';
import { announcement, findUser } from '@/apis/announcement'
import MyModal from "@/components/MyModal/App"
import { io } from "socket.io-client";

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
]

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [list, setlist] = useState()
  const [user, setuser] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"))
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [socket, setSocket] = useState(null);
  //当前在线用户数据
  const [onlineUser, setonlineUser] = useState([])
  //用户聊天数据
  const [messageBox, setmessageBox] = useState({
    [token.username]: [],
  });
  // //过虑出和自己相关的聊天数据
  // const [filterMessage,setfilterMessage] = useState

  useEffect(() => {
    fineUser()
  }, [])

  // 调用 api 请求用户数据
  const fineUser = async () => {
    const res = await findUser(token.username, token.password)
    setuser(res.data)
    setUserDataLoaded(true)
  }
  //使用socketio获取在线用户
  useEffect(() => {
    if (userDataLoaded) {
      // 在成功获取用户数据之后，连接 WebSocket 服务器
      const newSocket = io("http://localhost:8080", {
        query: {
          username: user[0]?.username,
          avatar: user[0]?.avatar,
        },
      });

      setSocket(newSocket);

      newSocket.on('online', (data) => {
        //过虑出不包含本用户的所有用户
        const filterUser = data.userList.filter(item => item.username !== user[0].username)
        setonlineUser(filterUser)
      })
    }
  }, [userDataLoaded, user])

  useEffect(() => { fineAnnouncement() }, [])

  //调用api请求公告栏数据
  const fineAnnouncement = async () => {
    const res = await announcement()
    setlist(res.data)
  }

  const AcquireMessage = (data, id) => {
    setmessageBox((prev) => {
      return {
        ...prev,
        [user[0]?.username]: prev[user[0]?.username]?.concat(data) || [data],
      };
    });

    socket.emit('send', {
      fromUser: token.username,
      targetId: id,
      msg: data.msg,
    });
  };

  useEffect(() => {
    // 监听回信
    if (socket) {
      const receiveHandler = (data) => {
        setmessageBox((prev) => {
          return {
            ...prev,
            [user[0]?.username]: prev[user[0]?.username]?.concat(data) || [data],
          };
        });
      };
      socket.on('receive', receiveHandler);

      return () => {
        socket.off('receive', receiveHandler); // 移除监听器
      };
    }
  }, [socket, user]);

  const aaa = () => {
    socket.emit("logout");
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
              list && <Notice title="活动公告" list={list}/>
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
      {/* 消息弹窗 */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultShadow: "0 0 14px 6px rgba(0, 0, 0, 0.1)"
            },
          },
        }}
      >
        <Button
          shape="circle"
          icon={<CommentOutlined style={{ fontSize: "28px" }} />}
          size='large'
          className={Style.message}
          onClick={() => { setIsModalOpen(true) }}
        />
      </ConfigProvider>
      <MyModal
        open={isModalOpen}
        CancelOpen={(data) => { setIsModalOpen(data) }}
        user={user}
        onlineUser={onlineUser}
        AcquireMessage={AcquireMessage}
        messageBox={messageBox[token.username]}
        aaa={aaa}
      ></MyModal>
    </Layout>
  )
}
export default Home;
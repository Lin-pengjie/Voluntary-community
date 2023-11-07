import { Card, List } from 'antd'
import Style from '@/assets/css/main.module.css'
import Meta from 'antd/es/card/Meta'
import { LikeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ActivityDisplay, news, findUser,userLike } from '@/apis/main'
import IconText from '@/components/praise/App'

export default function Index() {
  const [Display, setDisplay] = useState([])
  const [newsData, setnewsData] = useState([])
  const token = JSON.parse(localStorage.getItem("token"))
  const [user, setuser] = useState([])

  useEffect(() => { DisplayData() }, [])
  useEffect(() => { newsD() }, [])
  useEffect(() => { fineUser() }, [])

  //调用api请求用户数据
  const fineUser = async () => {
    const res = await findUser(token.username, token.password)
    setuser(res.data)
  }

  //调用api请求活动展示数据，存入Display
  const DisplayData = async () => {
    const res = await ActivityDisplay()
    setDisplay(res.data)
  }
  //调用api请求新闻数据，存入newsData
  const newsD = async () => {
    const res = await news()
    setnewsData(res.data)
  }

  const handlike = (id) => {
    userLike(user[0].id,{
      likedNewsIds: [...user[0].likedNewsIds,id]
    })
  }

  return (
    <div className={Style.box}>
      <Card title="活动展示">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {
            Display.map(item => {
              return (
                <Card
                  key={item.id}
                  hoverable
                  style={{ width: '30%' }}
                  cover={<img style={{ width: "100%", height: "320px" }} alt="example" src={item.imageUrl} />}
                >
                  <Meta title={item.activityName} description={item.description} />
                </Card>
              )
            })
          }
        </div>
      </Card>

      <Card title="实时新闻">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={newsData}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[<IconText
                icon={LikeOutlined}
                text={item.praise}
                id={item.id}
                key={item.id}
                likedNewsIds={user[0]?.likedNewsIds}
                handlike={(id) => {handlike(id)}}
              />]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={item.imageUrl}
                />
              }
            >
              <List.Item.Meta
                title={<a href='#'>{item.newsName}</a>}
                description={item.publisher}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

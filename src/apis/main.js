import axios from '@/util/axiosUtil'

//请求活动展示数据api
export const ActivityDisplay = ()=> {
    return axios("/ActivityDisplay")
}

//请求新闻数据api
export const news = () => {
    return axios("/news")
}

//修改新闻点赞api
export const praise = (id,data) => {
    return axios.patch(`/news/${id}`,data)
}
import axios from "@/util/axiosUtil"

//请求公告数据api
export const announcement = () => {
    return axios("/announcement")
}
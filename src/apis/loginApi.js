import axios from "@/util/axiosUtil"

export const verifyUser = () => {
    return axios("/OldUser")
}
import {http} from "@/service/api.js";

export const getAnswer = async (message) => {
    const data = await http.post(`/ask`, {
        query: message
    })
    console.log(data)
    return data
}
